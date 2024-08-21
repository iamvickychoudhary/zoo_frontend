<template>
    <div>
        <BContainer>
            <BCard class="shadow-lg p-4 mt-3 my-3">
                <BRow>
                    <BCol md="10">
                        <div>
                            <h4>Running Progress </h4>
                        </div>
                        <div>
                            <h6 class="text-body-secondary">View already running programs or create a new program with
                                different action</h6>
                        </div>
                    </BCol>
                    <BCol md="2">
                       <ZooAdd/>
                    </BCol>

                </BRow>

                <BRow>
                    <BCol>
                        <BCard header="Zoo List" header-text-variant="white" header-tag="header"
                            header-bg-variant="dark" footer="Zoo List" footer-tag="footer" footer-bg-variant="success"
                            footer-border-variant="dark" title="Title" style="max-width: auto">
                            <LazyZooList />
                        </BCard>
                    </BCol>
                </BRow>
            </BCard>
        </BContainer>
    </div>
</template>

<script setup lang="ts">

</script>

<style></style>
