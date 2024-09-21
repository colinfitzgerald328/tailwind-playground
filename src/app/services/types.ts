export interface QueriedAthlete {
    athlete: Athlete;
    results: AthleteResult[];
    top_competitors: TopCompetitor[];
    similar_athletes?: CloseMatch[];
  }
  
interface Athlete {
    id: string;
    athlete_id: number;
    first_name: string;
    last_name: string;
    date_of_birth?: string;
    country: string;
    url_slug: string;
    primary_disciplines: string;
    accomplishments?: string[];
    personal_bests?: any[]; // You might want to define a more specific type here
    gender: string;
    wikipedia_url?: string;
    social_urls?: Record<string, string> | string[];
    nickname?: string;
    hq_images?: string[];
    markdown_summary?: string;
}
  
interface AthleteResult {
    date: string;
    competition: string;
    venue: string;
    indoor?: boolean;
    discipline_code?: string;
    discipline_name_url_slug?: string;
    type_name_url_slug?: string;
    discipline: string;
    country: string;
    category: string;
    race: string;
    place: string;
    mark: string;
    wind?: string;
    not_legal?: boolean;
    result_score?: number;
    remark?: string;
    timestamp: number;
}
  
interface TopCompetitor {
    athlete_id: number;
    primary_disciplines: string;
    first_name: string;
    last_name: string;
    markdown_summary?: string;
    hq_images?: string[];
}
  
interface CloseMatch {
    athlete_id: number;
    first_name: string;
    last_name: string;
    primary_disciplines: string;
    hq_images?: string[];
}