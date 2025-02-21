import { create } from "zustand";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { User } from "../../../domain/entities/user.entity";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()( (set, get) => ({

    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        const resp = await authLogin( email, password );
        if ( !resp ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        // guarda el token
        await StorageAdapter.setItem('token', resp.token );

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    },

    checkStatus: async () => {
        const resp = await authCheckStatus();
        // console.log('resp: ', resp);
        
        if ( !resp ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return;
        }

        // guarda el token
        await StorageAdapter.setItem('token', resp.token );

        set({ status: 'authenticated', token: resp.token, user: resp.user });

    },

    logout: async () => {
        
        // elimina el token
        await StorageAdapter.removeItem( 'token' );

        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

    register: async (email: string, password: string, fullName: string) => {
        const resp = await authRegister( email, password, fullName );
        if ( !resp ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            return false;
        }

        // guarda el token
        await StorageAdapter.setItem('token', resp.token );

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    }

}))