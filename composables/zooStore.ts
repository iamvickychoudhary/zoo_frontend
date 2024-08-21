import { useState } from '#app';
import type { Ref } from 'vue';
import type { zooDetails, queryFilter, zooForm } from '../types/zooTypes';
import {useCustomToast} from "~/composables/useCustomToast"

export const useZooData = () => {
  const {showToast}= useCustomToast()
  const zooList: Ref<zooDetails[]> = useState('zooList', () => []);


  const queryFilter: Ref<queryFilter> = useState('queryFilter', () => ({
    filters: {
      name: "",
      state: "",
      createdAfter: "",
      createdBefore: "",
      location: {
        city: "",
        state: "",
        country: ""
      }
    },
    page: 1,
    limit: 1000,
  }));

  const { status, data: zooData, error, execute } = useFetch<zooDetails[] | undefined>('http://localhost:3000/api/zoo/list', {
    method: 'POST',
    body: queryFilter.value,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  const fetchZooDetails = () => {
    zooList.value = [];
    try {
      execute()
        .then(() => {
          if (status.value === "success") {
            zooList.value = [...zooData.value];
          }
          else {
            navigateTo('/login')
          }
        })
        .catch(error => {
          console.error("An error occurred:", error);
        });

      zooList.value = zooData.value || [];
    } catch (err) {
      console.error('Error fetching zoo details:', err);
    }
  };

  const statusChange = async (zooData: zooDetails) => {
    let stateCode: string = ''
    if (zooData.state === '100') {
      stateCode = '200';
    } else {
      stateCode = '100';
    }
    const res = confirm("Are you sure you want to change the Status?")
    if (res) {
      const { status, data: zooStatus } = await useFetch(`http://localhost:3000/api/zoo/${zooData.id}/deactivate`, {
        method: 'POST',
        body: JSON.stringify({ state: stateCode })
      })
      if (status.value === "success") {
        fetchZooDetails()
        showToast("Status has been changed successfully")
      }
      else{
        showToast("Failed !!!", "danger")
      }

    }

  }

  const handleListFilter = (search: any) => {
    queryFilter.value.filters.name = search
    execute().then(() => zooList.value = [...zooData.value]
    )
  }

  const filterByZooStatus = (event: any) => {
    const value = event.target.value;
    if (value !== "") {
      queryFilter.value.filters.state = value;
      execute().then(() => zooList.value = [...zooData.value])
    } else {
      queryFilter.value.filters.state = value;
      execute().then(() => zooList.value = [...zooData.value])

    }

  }

  const filterByDateRange = () => {
    execute().then(() => zooList.value = [...zooData.value])
  }


  return {
    zooList,
    queryFilter,
    fetchZooDetails,
    statusChange,
    handleListFilter,
    filterByZooStatus,
    filterByDateRange,
    status,
    error,
  };
};
