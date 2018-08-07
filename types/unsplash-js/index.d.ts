// Type definitions for unsplash-js 4.8
// Project: https://github.com/unsplash/unsplash-js#readme
// Definitions by: Gus Sillero <https://github.com/sillero>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8


export default UnsplashSDK;
export function toJson<R = object>(res: Response): Response | Promise<R>;

// type Response = object;

declare class UnsplashSDK {
    constructor(options: UnsplashSDK.ConstructorOptions);

    auth: Auth;
    currentUser: CurrentUser;
    users: Users;
    photos: Photos;
    collections: Collections;
    search: Search;
    stats: Stats;
}

interface Auth {
    getAuthenticationUrl: (scope?: UnsplashSDK.Scope[]) => string;
    userAuthentication: (code: string) => Promise<Response>;
    setBearerToken: (accessToken: string) => void;
}

interface CurrentUser {
    profile: () => Promise<Response>;
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
    ) => Promise<Response>;
}

interface Collections {
    listCollections: (
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    listCuratedCollections: (
        page?: number,
        perPage?: number
    ) => Promise<Response>;

    listFeaturedCollections: (
        page?: number,
        perPage?: number
    ) => Promise<Response>;

    getCollection: (id: number) => Promise<Response>;

    getCuratedCollection: (id: number) => Promise<Response>;

    getCollectionPhotos: (
        id: number,
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    getCuratedCollectionPhotos: (
        id: number,
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    createCollection: (
        title: string,
        description?: string,
        isPrivate?: boolean
    ) => Promise<Response>;

    updateCollection: (
        id: number,
        title?: string,
        description?: string,
        isPrivate?: boolean
    ) => Promise<Response>;

    deleteCollection: (id: number) => Promise<Response>;

    addPhotoToCollection: (
        collectionId: number,
        photoId: string
    ) => Promise<Response>;

    removePhotoFromCollection: (
        collectionId: number,
        photoId: string
    ) => Promise<Response>;

    listRelatedCollections: (collectionId: number) => Promise<Response>;
}
interface Photos {
    listPhotos: (
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    listCuratedPhotos: (
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    getPhoto: (
        id: string,
        width?: number,
        height?: number,
        rectangle?: [number, number, number, number]
    ) => Promise<Response>;

    getPhotoStats: (id: string) => Promise<Response>;

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
    ) => Promise<Response>;

    likePhoto: (id: string) => Promise<Response>;

    unlikePhoto: (id: string) => Promise<Response>;

    downloadPhoto: (photo: UnsplashSDK.Photo) => Promise<Response>;
}

type Searcher = (
    keyword: string,
    page?: number,
    per_page?: number
) => Promise<Response>;

interface Search {
    photos: Searcher;
    users: Searcher;
    collections: Searcher;
}

interface Stats {
    total: () => Promise<Response>;
}

interface Users {
    profile: (username: string) => Promise<Response>;

    photos: (
        username: string,
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy,
        stats?: boolean
    ) => Promise<Response>;

    likes: (
        username: string,
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.OrderBy
    ) => Promise<Response>;

    collections: (
        username: string,
        page?: number,
        perPage?: number,
        orderBy?: UnsplashSDK.CollectionsOrderBy
    ) => Promise<Response>;

    statistics: (
        username: string,
        resolution?: UnsplashSDK.Resolution,
        quantity?: number
    ) => Promise<Response>;
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

    interface PhotoURLs {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
    }

    interface PhotoLinks {
        self: string;
        html: string;
        download: string;
        download_location: string;
    }

    interface UserLinks {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        following: string;
        followers: string;
    }

    interface UserProfileImageLinks {
        small: string;
        medium: string;
        large: string;
    }

    interface User {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string | null;
        twitter_username: string | null;
        portfolio_url: string | null;
        bio: string | null;
        location: string | null;
        links: UserLinks;
        profile_image: UserProfileImageLinks;
        instagram_username: string;
        total_collections: number;
        total_likes: number;
        total_photos: number;
    }

    interface Photo {
        id: string;
        created_at: string;
        updated_at: string;
        width: number;
        height: number;
        color: string;
        description: string | null;
        urls: PhotoURLs;
        links: PhotoLinks;
        categories: string[];
        sponsored: boolean;
        likes: number;
        liked_by_user: boolean;
        current_user_collections: string[];
        slug: null;
        user: User;
    }

    interface PreviewPhoto {
        id: number;
        urls: PhotoURLs;
    }

    interface Tag {
        title: string;
    }

    interface Collection {
        id: number;
        title: string;
        description: string;
        published_at: string;
        updated_at: string;
        curated: boolean;
        featured: boolean;
        total_photos: number;
        private: boolean;
        share_key: string;
        tags: Tag[];
        cover_photo: Photo[];
        preview_photos: PreviewPhoto[];
        user: User;
    }

    interface Meta {
        canonical: string | null;
        description: string | null;
        h1: string | null;
        index: boolean;
        keyword: string;
        suffix: string | null;
        text: string | null;
        title: string | null;
    }

    interface SearchResponse<T> {
        results: T[];
        total: number;
        total_pages: number;
    }

    interface RelatedSearch {
        title: string;
        url: string;
    }

    interface SearchAllResponse {
        collections: SearchResponse<Collection>;
        meta: Meta;
        photos: SearchResponse<Photo>;
        related_searches: RelatedSearch[];
        users: SearchResponse<User>;
    }
}
