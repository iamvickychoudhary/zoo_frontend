import { ref } from 'vue';
import type { Ref } from 'vue';
import type { zooForm } from '../types/zooTypes';

export const useZooFormData = () => {
    const zooId = ref()
    // responsible for modalPopupOpen
    const zooAddModalOpen = useState('zooAddModalOpen', () => false);
    const zooEditModalOpen = useState('zooEditModalOpen', () => false);

    const zooFormData = useState('zooFormData', () => ({
        name: '',
        animalTags: [],
        zooLocation: {
            websiteUrl: '',
            houseNo: '',
            area: '',
            city: '',
            pincode: '',
            state: '',
            country: '',
            imgUrl: ''
        }
    }));

    const zooAddDetails = async () => {
            const zooData = { ...zooFormData.value }
            const { status } = await useFetch(`http://localhost:3000/api/zoo/save`, {
                method: 'POST',
                body: JSON.stringify({ ...zooData })
            })
            return status.value
    }

    const fetchZooDetailById = async (id: any) => {
        zooId.value = id

        const { status, data: zooDetails } = await useFetch<any>(`http://localhost:3000/api/zoo/${zooId.value}`, { method: 'GET' });

        if (status.value === "success") {
            zooFormData.value.name = zooDetails.value.name || ""
            zooFormData.value.animalTags = zooDetails.value.animal_tags || ""
            zooFormData.value.zooLocation.websiteUrl = zooDetails.value.Locations[0].website_url || ""
            zooFormData.value.zooLocation.houseNo = zooDetails.value.Locations[0].number || ""
            zooFormData.value.zooLocation.area = zooDetails.value.Locations[0].area || ""
            zooFormData.value.zooLocation.city = zooDetails.value.Locations[0].city || ""
            zooFormData.value.zooLocation.pincode = zooDetails.value.Locations[0].pincode || ""
            zooFormData.value.zooLocation.state = zooDetails.value.Locations[0].state || ""
            zooFormData.value.zooLocation.country = zooDetails.value.Locations[0].country || ""
            zooFormData.value.zooLocation.imgUrl = zooDetails.value.Locations[0].img_url || ""
        }
    }

    const zooUpdate = async () => {
        const zooData = { ...zooFormData.value }
        const { status } = await useFetch(`http://localhost:3000/api/zoo/${zooId.value}`, {
            method: 'PUT',
            body: JSON.stringify({ ...zooData })
        })
        return status.value
    }

    return {
        zooFormData,
        zooAddModalOpen,
        zooEditModalOpen,
        zooAddDetails,
        fetchZooDetailById,
        zooUpdate,
        
    };
};
