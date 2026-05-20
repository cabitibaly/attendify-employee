import { Pointage } from "@/interface/pointage"
import DEV_API_URL from "@/utils/api"
import { authenticatedRequest } from "@/utils/authUtils"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

interface PointageResponse {
    hasNextPage: boolean
    pointages: Pointage[]
    status: number
    total: number
}

interface MaPositionResponse {
    est_sur_site: boolean
    status: number
}

const fetchPointages = async (
    page = 1, 
    limit = 10,
    aujourdhui = true,
    date?: string,    
): Promise<PointageResponse | null> => {
    return await authenticatedRequest<PointageResponse>({
        url: `${DEV_API_URL}/pointage/tous-mes-pointages`,
        method: 'GET',
        params: {
            page,
            limit,
            aujourdhui,
            date,            
        }
    })
}

export const useFetchPointage = (aujourdhui = true, date?: string) => {    

    const { data, isLoading, hasNextPage,  isFetchingNextPage, fetchNextPage, refetch } = useInfiniteQuery<PointageResponse | null>({
        queryKey: ['pointages', aujourdhui, date],
        initialPageParam: 1,
        queryFn: async ({ pageParam }) => await fetchPointages(pageParam as number, 10, aujourdhui, date),
        getNextPageParam: (lastPage, allPages) => lastPage?.hasNextPage ? allPages.length + 1 : undefined,
        staleTime: 5 * 60 * 1000,
    })

    const pointages: Pointage[] =  
        data?.pages.flatMap(page => page?.pointages)
        .filter(pointage => pointage !== undefined) ?? []

    const handleLoadMore = () => {
        if (!isFetchingNextPage && hasNextPage) {
            fetchNextPage()
        }
    }

    return {
        pointages,
        isLoading,
        isFetchingNextPage,        
        handleLoadMore,
        refetch,
    }
}

export const useFetchMaPosition = (latitude: number | null, longitude: number | null) => {
    const { data, isLoading, isFetching, refetch } = useQuery<MaPositionResponse | null>({
        queryKey: ['pointages-ma-position', latitude, longitude],
        queryFn: async () => await authenticatedRequest<MaPositionResponse>({
            url: `${DEV_API_URL}/pointage/est-sur-site`,
            method: 'GET',
            params: {
                latitude,
                longitude,
            }
        }),
        staleTime: 30 * 1000,
        enabled: !!latitude && !!longitude,
    })

    return {
        isLoading,
        isFetching,
        data,
        refetch,
    }
}