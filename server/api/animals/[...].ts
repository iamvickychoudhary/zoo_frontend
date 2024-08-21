// import { createRouter, defineEventHandler, useBase, readBody, useSession } from 'h3';
// import {getAnimalDetails,deactivateAnimal, saveAnimal, updateAnimal, listAnimal} from "./controller"

// const router = createRouter()


// router.get('/:id', defineEventHandler(getAnimalDetails()));
// router.post('/:id/deactivate', defineEventHandler(deactivateAnimal()));
// router.post('/save', defineEventHandler(saveAnimal()));
// router.put('/:id', defineEventHandler(updateAnimal()));
// router.post('/list', defineEventHandler(listAnimal()));


// export default useBase('/api/animals', router.handler)
export default defineEventHandler(async (event) => {
    // ... Do whatever you want here
    return 'Hello'
})
