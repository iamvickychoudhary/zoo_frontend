<template>
    <div>
        <b-form @submit="onSubmit">
         <KeepAlive>
            <LazyZooComponentZooForm />
         </KeepAlive>
            <b-button  variant="primary" class="mt-3 mx-auto d-block"> Add </b-button>
        </b-form>
    </div>
</template>

<script setup lang="ts">
import { useZooFormData  } from "~/composables/zooForm"
import { useZooData } from "~/composables/zooStore"
import { useZooFormHandler } from '~/utils/useZooFormValidator';
const {showToast}= useCustomToast()

const result = ref('')

const { fetchZooDetails } = useZooData()
const { zooAddDetails, zooAddModalOpen } = useZooFormData ()

const { errors, onSubmit} = useZooFormHandler();

// const handleSubmit = ()=>{
//     onSubmit()
// }


</script>

<style >

</style>