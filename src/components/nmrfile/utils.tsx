import { useQuery } from '@tanstack/react-query';

export const dbURL = 'https://nmrdb.cheminfo.org/v1/';

export function useStatsQuery(staleTime = 250) {
  return useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const response = await fetch(`${dbURL}getStats`);
      const answer = await response.json();
      return answer.result;
    },
    staleTime,
  });
}
