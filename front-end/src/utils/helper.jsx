import { useState } from "react";

export const SecretEmail = (email) => {
    
    const emailString = String(email);
    const [username,domain] =  emailString.split("@");
    const secretUser = username.substring(0,2 ) + "*".repeat(username.length - 2);
    return `${secretUser}@${domain}`;

    

   

}
export const readtime = (desc) => {
    const averageReading = 225; // Average reading speed in words per minute

    const div = document.createElement("div");
    div.innerHTML = desc.__html; // Set HTML content to a div

    const context = div.textContent || div.innerHTML; // Get the text content
    const word = context.trim().split(/\s+/); // Split text into words
    return Math.ceil(word.length / averageReading); // Calculate reading time in minutes
}