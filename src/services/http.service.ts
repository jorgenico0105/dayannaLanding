    
    
import { FormData } from "@/app/interfaces/post-interfaces";
import axios  from "axios";
import { resolve } from "path";


const url : string = 'https://nico0105.app.n8n.cloud/webhook/paciente-dayanna';

export async function postCitaPsicologa(body:FormData) {
    try {    
        const resp =  await axios.post(url,body)
        return resp
    } catch (error) {
        return error
    }
}     

