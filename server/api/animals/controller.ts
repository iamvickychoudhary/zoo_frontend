import { createError, useSession } from 'h3';
import { useFetch, useLazyFetch } from 'nuxt/app';

export function getAnimalDetails() {
    return async (event: any) => {
       try {
         //extract env variable using config
         const config = useRuntimeConfig();
         const animalId = parseInt(event.context.params.id)
 
         if (!Number.isInteger(animalId)) {
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
 
 
         const {status,data:animalData} = await useFetch(`${config.BaseUrl}/api/v1/animals/${animalId}`, {
             method: 'GET',
             headers: headers
         });
 
         if (status.value!=="success") {
             return createError({
                 statusCode: 401,
                 statusMessage: 'Unauthorized'
             });
         }
        
         return animalData;
         
       } catch (error) {
        console.log("error", error);
        
       }
    }
}

export function deactivateAnimal() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const animalId = parseInt(event.context.params.id)
         if (!Number.isInteger(animalId)) {
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
         
         const {status,data:animalStatusData} = await useFetch(`${config.BaseUrl}/api/v1/animals/${animalId}/deactivate`, {
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
 
         return animalStatusData
       } catch (error) {
        console.log("error", error);
       }

    }
}

export function saveAnimal() {
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
 
         
         const {status, data:animalSaveResponse} = await useFetch(`${config.BaseUrl}/api/v1/animals`, {
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
        
         return animalSaveResponse;
       } catch (error) {
        console.log("error", error);
       }
    }
}

export function updateAnimal() {
    return async (event: any) => {
       try {
         const config = useRuntimeConfig();
         const animalId = parseInt(event.context.params.id)
         console.log("id", animalId);
 
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
 
         
         const {status,data:animalUpdateResponse} = await useFetch(`${config.BaseUrl}/api/v1/animals/${animalId}`, {
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
         
         return animalUpdateResponse;
       } catch (error) {
        console.log("error",error);
        
       }
    }
}

export function listAnimal() {
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
 
        
         const {status, data:zooListData} = await useLazyFetch(`${config.BaseUrl}/api/v1/animals/list`, {
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