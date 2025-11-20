import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  private cache: RulesSchema | null = null;

  // Fetch rules JSON from an API and validate/return it as RulesSchema
  async getRules(forceRefresh = false): Promise<RulesSchema> {
    if (this.cache && !forceRefresh) {
      return this.cache;
    }

    // TODO: Replace with real API call when endpoint is ready.
    // Example when ready:
    // const res = await fetch('/api/rules');
    // if (!res.ok) throw new Error(`Failed to load rules: ${res.status}`);
    // const data = (await res.json()) as unknown;

    return this.cache;
  }

  clearCache(): void {
    this.cache = null;
  }
}
