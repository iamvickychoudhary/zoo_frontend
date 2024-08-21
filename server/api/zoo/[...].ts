import { createRouter, defineEventHandler, useBase, readBody, useSession } from 'h3';
import {getZooDetails,deactivateZoo, saveZoo, updateZoo, listZoo} from "./controller"

const router = createRouter()


router.get('/:id', defineEventHandler(getZooDetails()));
router.post('/:id/deactivate', defineEventHandler(deactivateZoo()));
router.post('/save', defineEventHandler(saveZoo()));
router.put('/:id', defineEventHandler(updateZoo()));
router.post('/list', defineEventHandler(listZoo()));


export default useBase('/api/zoo', router.handler)

