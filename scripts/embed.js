export default class Embed{

    constructor(){
        this.title = "";
        this.description = "";
        this.image = "";
        this.thumbnail = "";
        this.color = "";
        this.footer = "";
        this.fields = [];
    }


    /**
     * 
     * @param {string} title title of the embed
     * @returns {void} 
     */

    setTitle(title){
        this.title = title;
    }

    /**
     * 
     * @param {string} description description of the embed
     * @returns {void}
     */
    setDescription(description){
        this.description = description;
    }

    /**
     * 
     * @param {string} url image url of embed
     * @returns {void} 
    */
    setImage(url){
        this.image = url;
    }

    /**
     * 
     * @param {string} url 
     * @returns {void}
     */
    setThumbnail(url){
        this.thumbnail = url;
    }

    /**
     * 
     * @param {integer} color 
     */
    setColor(color){
        this.color = color;
    }

    /**
     * 
     * @param {string} footer footer of embed
     * @returns {void} 
     */
    setFooter(footer){
        this.footer = footer;
    }

    /**
     * 
     * @param {string} name 
     * @param {string} value
     * @param {boolean} inline
     * @returns {void}
     */
    addField(name="", value="", inline=false){
        this.fields.push({name : name, value: value, inline: inline});
    }
}