import { useState } from "react";

export const SecretEmail = (email) => {
    
    const emailString = String(email);
    const [username,domain] =  emailString.split("@");
    const secretUser = username.substring(0,2 ) + "*".repeat(username.length - 2);
    return `${secretUser}@${domain}`;

    

   

}
export const readtime = (desc) => {
    const averageReading = 225; 

    const div = document.createElement("div");
    div.innerHTML = desc.__html; 

    const context = div.textContent || div.innerHTML;
    const word = context.trim().split(/\s+/); 
    return Math.ceil(word.length / averageReading); 
}
export const formatnumber = (num) => {
    if (num >= 1e9){
        return (num / 1e9).toFixed(1) +"B"
    }
    else if(num >= 1e6){
        return (num / 1e6).toFixed(1) +"M"

        
    }
    else if(num >= 1e3){
        return (num / 1e3).toFixed(1) +"K"

    }
    else{
        return num.toString()
    }
};