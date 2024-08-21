import { createError, useSession } from 'h3';
import { useFetch, useLazyFetch } from 'nuxt/app';

export function getZooDetails() {
    return async (event: any) => {
       try {
         //extract env variable using config
         const config = useRuntimeConfig();
         const zooId = parseInt(event.context.params.id)
 
         if (!Number.isInteger(zooId)) {
             throw createError({
                 statusMessage: "ID should be an Integer",
             })
         }
 
         const session = await useSession(event, {
             password: config.SessionPassword,
         });
 
         //get token from session
         const token: string = session.data.token;
 
         const headers = {
             Authorization: `Bearer ${token}`,
         };
 
 
         const {status,data:zooData} = await useFetch(`${config.BaseUrl}/api/v1/zoos/${zooId}`, {
             method: 'GET',
             headers: headers
         });
 
         if (status.value!=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
        
         return zooData;
         
       } catch (error) {
        console.log("error", error);
        
       }
    }
}

export function deactivateZoo() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const zooId = parseInt(event.context.params.id)
         if (!Number.isInteger(zooId)) {
             throw createError({
                 statusMessage: "ID should be an Integer",
             })
         }
         const formBody = await readBody(event);
         const session = await useSession(event, {
             password: config.SessionPassword,
         });
 
         //get token from session
         const token: string = session.data.token;
 
         const headers = {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
         };
         
         const {status,data:zooStatusData} = await useFetch(`${config.BaseUrl}/api/v1/zoos/${zooId}/deactivate`, {
             method: 'POST',
             headers: headers,
             body: JSON.stringify(formBody)
         });
         if (status.value!=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
 
         return zooStatusData
       } catch (error) {
        console.log("error", error);
       }

    }
}

export function saveZoo() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const formBody = await readBody(event);
         console.log(formBody);
 
         const session = await useSession(event, {
             password: config.SessionPassword,
         });
 
         //get token from session
         const token: string = session.data.token;
 
         const headers = {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
         };
 
         
         const {status, data:zooSaveResponse} = await useFetch(`${config.BaseUrl}/api/v1/zoos`, {
             method: 'POST',
             headers: headers,
             body: JSON.stringify(formBody)
         });
         if (status.value!=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
        
         return zooSaveResponse;
       } catch (error) {
        console.log("error", error);
       }
    }
}

export function updateZoo() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const zooId = parseInt(event.context.params.id)
         console.log("id", zooId);
 
         const formBody = await readBody(event);
 
         const session = await useSession(event, {
             password: config.SessionPassword,
         });
 
         //get token from session
         const token: string = session.data.token;
 
         const headers = {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
         };
 
         
         const {status,data:zooUpdateResponse} = await useFetch(`${config.BaseUrl}/api/v1/zoos/${zooId}`, {
             method: 'PUT',
             headers: headers,
             body: JSON.stringify(formBody)
         });
 
         if (status.value !=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
         
         return zooUpdateResponse;
       } catch (error) {
        console.log("error",error);
        
       }
    }
}

export function listZoo() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const formBody = await readBody(event);
 
         const session = await useSession(event, {
             password: config.SessionPassword,
         });
 
         //get token from session
         const token: string = session.data.token;
 
         const headers = {
             Authorization: `Bearer ${token}`,
             'Content-Type': 'application/json',
         };
 
        
         const {status, data:zooListData} = await useLazyFetch(`${config.BaseUrl}/api/v1/zoos/list`, {
             method: 'POST',
             headers: headers,
             body: JSON.stringify(formBody)
         });
         if (status.value !=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
        
         return zooListData;
       } catch (error) {
        console.log("error", error);
       }
    }
}