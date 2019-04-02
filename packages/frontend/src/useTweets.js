import { useFetch } from 'react-fetch-hook'

export const useTweets = hashtag => {
  const BASE_URL = 'https://tagcloud.willcodefor.beer'
  const { data, isLoading } = useFetch(
    `${BASE_URL}/search?hashtag=${hashtag}`,
    {
      depends: [hashtag],
    }
  )

  return {
    isLoading,
    words: data || [],
  }
}
