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
                            @click="zooAddModalOpen = !zooAddModalOpen">
                            CREATE NEW
                        </BButton>
                    </BCol>
                </BRow>
                <BRow>
                    <BCol>
                        <ZooComponentZooList />
                    </BCol>
                </BRow>
            </BCard>
        </BContainer>
        <!-- modal popup -->
        <ClientOnly>
            <BModal v-model="zooAddModalOpen" size="lg" title="ZOO ADD" scrollable ok-only no-stacking>
                <LazyZooComponentZooAdd />
            </BModal>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
const { zooAddModalOpen } = useZooFormData()

</script>

<style lang="scss" scoped></style>