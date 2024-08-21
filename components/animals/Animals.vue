<template>
    <div>
        <BContainer>
            <BCard class="shadow-lg mt-3 my-3">
                <BRow>
                    <BCol md="10" style="padding: 35px;">
                        <div>
                            <h4>Running Progress </h4>
                        </div>
                        <div>
                            <h6 class="text-body-secondary">View already running programs or create a new program with
                                different action</h6>
                        </div>
                    </BCol>
                    <BCol md="2" style="padding: 40px;">
                        <BButton variant="info" size="sm" class="float-end text-light shadow"
                            @click="animalAddModalOpen = !animalAddModalOpen">
                            CREATE NEW
                        </BButton>
                    </BCol>
                </BRow>
                <BRow>
                    <BCol>
                       <AnimalsAnimalList/>
                    </BCol>
                </BRow>
            </BCard>
        </BContainer>
        <!-- modal popup -->
        <ClientOnly>
            <BModal v-model="animalAddModalOpen" size="lg" title="ANIMAL ADD" scrollable ok-only no-stacking>
                <LazyAnimalsAnimalAdd v-if="animalAddModalOpen"/>
            </BModal>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const { animalAddModalOpen, status, error } = useAnimalData()

</script>

<style lang="scss" scoped></style>