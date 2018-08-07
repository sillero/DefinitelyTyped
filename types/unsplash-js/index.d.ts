// Type definitions for unsplash-js 4.8
// Project: https://github.com/unsplash/unsplash-js#readme
// Definitions by: Gus Sillero <https://github.com/sillero>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export default UnsplashSDK;
export function toJson(res: object): object;

declare class UnsplashSDK {
    constructor(options: UnsplashSDK.ConstructorOptions);

    auth: UnsplashSDK.Auth;
    currentUser: UnsplashSDK.CurrentUser;
    users: UnsplashSDK.Users;
    photos: UnsplashSDK.Photos;
    collections: UnsplashSDK.Collections;
    search: UnsplashSDK.Search;
    stats: UnsplashSDK.Stats;
}

declare namespace UnsplashSDK {
    interface ConstructorOptions {
        apiUrl?: string;
        apiVersion?: string;
        applicationId?: string;
        secret?: string;
        callbackUrl?: string;
        bearerToken?: string;
        headers?: object;
    }

    type Scope =
        | "public"
        | "read_user"
        | "write_user"
        | "read_photos"
        | "write_photos"
        | "write_likes"
        | "write_followers"
        | "read_collections"
        | "write_collections";
    type OrderBy = "latest" | "popular" | "oldest";
    type Resolution = "days";
    type CollectionsOrderBy = "published" | "updated";

    type RequestResponse<R = any> = Promise<R>;
    type Searcher = (
        keyword: string,
        page?: number,
        per_page?: number
    ) => RequestResponse;
    type Photo = {};

    interface Auth {
        getAuthenticationUrl: (scope?: Scope[]) => string;
        userAuthentication: (code: string) => RequestResponse;
        setBearerToken: (accessToken: string) => void;
    }

    interface CurrentUser {
        profile: () => RequestResponse;
        updateProfile: (
            options: {
                username?: string;
                firstName?: string;
                lastName?: string;
                email?: string;
                url?: string;
                location?: string;
                bio?: string;
                instagramUsername?: string;
            }
        ) => RequestResponse;
    }

    interface Collections {
        listCollections: (
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        listCuratedCollections: (
            page?: number,
            perPage?: number
        ) => RequestResponse;

        listFeaturedCollections: (
            page?: number,
            perPage?: number
        ) => RequestResponse;

        getCollection: (id: number) => RequestResponse;

        getCuratedCollection: (id: number) => RequestResponse;

        getCollectionPhotos: (
            id: number,
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        getCuratedCollectionPhotos: (
            id: number,
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        createCollection: (
            title: string,
            description?: string,
            isPrivate?: boolean
        ) => RequestResponse;

        updateCollection: (
            id: number,
            title?: string,
            description?: string,
            isPrivate?: boolean
        ) => RequestResponse;

        deleteCollection: (id: number) => RequestResponse;

        addPhotoToCollection: (
            collectionId: number,
            photoId: string
        ) => RequestResponse;

        removePhotoFromCollection: (
            collectionId: number,
            photoId: string
        ) => RequestResponse;

        listRelatedCollections: (collectionId: number) => RequestResponse;
    }
    interface Photos {
        listPhotos: (
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        listCuratedPhotos: (
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        getPhoto: (
            id: string,
            width?: number,
            height?: number,
            rectangle?: [number, number, number, number]
        ) => RequestResponse;

        getPhotoStats: (id: string) => RequestResponse;

        getRandomPhoto: (
            options: {
                width?: number;
                height?: number;
                query?: string;
                username?: string;
                featured?: boolean;
                collections?: string[];
                count?: number;
            }
        ) => RequestResponse;

        likePhoto: (id: string) => RequestResponse;

        unlikePhoto: (id: string) => RequestResponse;

        downloadPhoto: (photo: Photo) => RequestResponse;
    }

    interface Search {
        photos: Searcher;
        users: Searcher;
        collections: Searcher;
    }

    interface Stats {
        total: () => RequestResponse;
    }

    interface Users {
        profile: (username: string) => RequestResponse;

        photos: (
            username: string,
            page?: number,
            perPage?: number,
            orderBy?: OrderBy,
            stats?: boolean
        ) => RequestResponse;

        likes: (
            username: string,
            page?: number,
            perPage?: number,
            orderBy?: OrderBy
        ) => RequestResponse;

        collections: (
            username: string,
            page?: number,
            perPage?: number,
            orderBy?: CollectionsOrderBy
        ) => RequestResponse;

        statistics: (
            username: string,
            resolution?: Resolution,
            quantity?: number
        ) => RequestResponse;
    }
}
