
export default class Message{

    constructor(){
        this.url = "";
        this.content = ""; 
        this.embeds = [];
    }

    /**
     * 
     * @param {string} url
     * @returns {void} 
     */
    setWebhookUrl(url){
        this.url = url;
    }

    /**
     * 
     * @param {string} message 
     */
    setContentMessage(message){
        this.content = message;
    }

    /**
     * 
     * @param {JSON} embed
     * @returns {void} 
     */
    addEmbed(embed){
        this.embeds.push(embed);
    }

    /**
     * send the webhook
     */
    sendWebhook(){
        // create the json structure and send it
    }

}
