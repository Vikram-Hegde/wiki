export type Repo = {
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    archived: boolean;
    fork: boolean;
    stargazers_count: number;
    pushed_at: string;
    created_at: string;
};

export type LanguageStat = {
    name: string;
    count: number;
    activeCount: number;
    stars: number;
    earliest: string;
    latest: string;
    mostRecent: string;
};

export type NowLog = { repos: Repo[]; error: string | null };
export type Stack = { languages: LanguageStat[]; totalRepos: number; error: string | null };

const GITHUB_USER = "Vikram-Hegde";
const NOW_REPO_COUNT = 4;
const ACTIVE_THRESHOLD_DAYS = 90;

export async function fetchGitHubData(): Promise<{ now: NowLog; stack: Stack }> {
    let now: NowLog = { repos: [], error: null };
    let stack: Stack = { languages: [], totalRepos: 0, error: null };

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=owner`,
            {
                headers: { Accept: "application/vnd.github+json" },
                signal: AbortSignal.timeout(5000),
            },
        );
        if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
        const data: Repo[] = await res.json();
        const own = data
            .filter((r) => r.name.toLowerCase() !== GITHUB_USER.toLowerCase())
            .filter((r) => !r.fork);

        now.repos = own.slice(0, NOW_REPO_COUNT);

        const langMap = new Map<string, LanguageStat>();
        for (const r of own) {
            if (!r.language) continue;
            const lang = r.language;
            const existing = langMap.get(lang) ?? {
                name: lang,
                count: 0,
                activeCount: 0,
                stars: 0,
                earliest: r.created_at,
                latest: r.pushed_at,
                mostRecent: r.pushed_at,
            };
            const days = (Date.now() - new Date(r.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
            existing.count += 1;
            existing.stars += r.stargazers_count;
            if (days <= ACTIVE_THRESHOLD_DAYS) existing.activeCount += 1;
            if (new Date(r.created_at) < new Date(existing.earliest)) existing.earliest = r.created_at;
            if (new Date(r.pushed_at) > new Date(existing.latest)) existing.latest = r.pushed_at;
            if (new Date(r.pushed_at) > new Date(existing.mostRecent)) existing.mostRecent = r.pushed_at;
            langMap.set(lang, existing);
        }
        stack.languages = Array.from(langMap.values())
            .sort((a, b) => new Date(b.mostRecent).getTime() - new Date(a.mostRecent).getTime());
        stack.totalRepos = own.length;
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        now.error = msg;
        stack.error = msg;
    }

    return { now, stack };
}

export function deriveStatus(repo: Repo): string {
    if (repo.archived) return "ARCHIVED";
    const days = (Date.now() - new Date(repo.pushed_at).getTime()) / (1000 * 60 * 60 * 24);
    if (days < 30) return "SHIPPING";
    if (days < 180) return "MAINTAIN";
    if (days < 365) return "STALE";
    return "DORMANT";
}
