import url from "../../config";
import Axios from "axios";

export async function fetchPromos() {
    try {
        const endpoint = url + "/promocodes"
        const response = await Axios.get(endpoint)
        console.log("Получили данные в промокодах:", response)
        return response.data.codes
        }
        catch (err) {
            console.log("Произошла ошибка при загрузке промокодов..")
            throw err;
        }
}