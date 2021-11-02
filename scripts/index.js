import Embed from './embed.js';


const embeds = [];
const embedIDsAvailable = [0,1,2,3,4,5,6,7,8,9];
const webhookUrl = document.querySelector('#webhook-url');
const contentMessage = document.querySelector('#content-message');
let EMBED_CONFIG_DISABLED = true;


// Form events
const form = document.querySelector('form');
form.addEventListener("submit", (e)=> {
    e.preventDefault();
    sendEmbed();
});


// Button add embed events
const btnAddEmbed =  document.querySelector('.btn.add-embed');
btnAddEmbed.addEventListener('click', function(e){
    // Reset of values
    resetValuesEmbed();
    // Create new embed
    createEmbed();
});

// Button add field
document.querySelector('.add-field').addEventListener('click', () => {
    const embedConfig = document.querySelector('.embed-config');
    const fieldID = embeds[embedConfig.getAttribute('data-embedID')].fields.length;
    const element = createField(fieldID);
    element.querySelectorAll('input').forEach(input=>{
        input.addEventListener('input', (e) => {
            saveEmbedConfig(embedConfig.getAttribute('data-embedID'));
        })
    });
});

function createField(fieldID){
    const embedConfig = document.querySelector('.embed-config');
    
    const element = document.createElement('div');
    element.classList = "field-container";
    element.setAttribute('data-fieldID', fieldID);
    element.innerHTML = `<h4>Field ${fieldID}</h4>
    <div>
        <label for="embed-field-${fieldID}-name">Name</label>
        <input type="text" name="embed-field-${fieldID}-name" id="embed-field-${fieldID}-name" placeholder="Name" maxlenght="256">
    </div>

    <div>
        <label for="embed-field-1-value">Value</label>
        <input type="text" name="embed-field-${fieldID}-value" id="embed-field-${fieldID}-value" placeholder="Value" maxlenght="1024">
    </div>
    
    <div>
        <label for="embed-field-${fieldID}-inline">Inline</label>
        <input type="checkbox" name="embed-field-${fieldID}-inline" id="embed-field-${fieldID}-inline">
    </div>`;
    embedConfig.insertBefore(element, document.querySelector('.add-field'));
    saveEmbedConfig(embedConfig.getAttribute('data-embedID'));
    return element
}


// Save inputs changements
const inputsEmbedConfig =[
    document.querySelector('#title-embed'),
    document.querySelector('#description-embed'),
    document.querySelector('#image-embed'),
    document.querySelector('#thumbnail-embed'),
    document.querySelector("#footer-embed"),
    document.querySelector("#color-embed")
];
inputsEmbedConfig.forEach(input => {
    input.addEventListener('input', (e)=>{
        saveEmbedConfig(document.querySelector('.embed-config').getAttribute('data-embedid'));
    })
})


/**
 *  Save the values of embed in objects
 *  @param {integer} embedID the id of the embed to save informations 
 */
function saveEmbedConfig(embedID){    
    let embedObject = embeds.filter(embed => embed.id == embedID)[0];
    if(embedObject == undefined){
        embedObject = new Embed(embedID);
        embeds.push(embedObject);
    }
    embedObject.setTitle(document.querySelector('#title-embed').value);
    embedObject.setDescription(document.querySelector('#description-embed').value);
    embedObject.setImage(document.querySelector('#image-embed').value);
    embedObject.setThumbnail(document.querySelector('#thumbnail-embed').value);
    embedObject.setFooter(document.querySelector("#footer-embed").value);
    embedObject.setColor(parseInt(document.querySelector("#color-embed").value.replace("#", ""),16));


    document.querySelectorAll('.field-container').forEach((field)=> {
        const fieldID = field.getAttribute('data-fieldID');
        if(!embedObject.fields[fieldID]){
            embedObject.addField();
        }
        embedObject.fields[fieldID] = {
            name : field.querySelector("div:nth-of-type(1) input").value,
            value : field.querySelector("div:nth-of-type(2) input").value,
            inline :    field.querySelector("div:nth-of-type(3) input").checked
        }
    });
}


/**
 * Reset alls values of inputs embed config
 */
function resetValuesEmbed(){
    document.querySelector('#title-embed').value = "";
    document.querySelector('#description-embed').value = ""; 
    document.querySelector('#image-embed').value = "";
    document.querySelector('#thumbnail-embed').value = "";
    document.querySelector("#footer-embed").value = "";
    document.querySelector("#color-embed").value = "";
    document.querySelectorAll('.field-container').forEach((field)=> field.remove());
}


/**
 * Create a new embed 
 */
function createEmbed(){
    const selectEmbedID = embedIDsAvailable.sort().shift();

    const element = document.createElement('div');
    element.classList = "btn show-embed";
    element.setAttribute('data-embed', selectEmbedID);
    element.innerHTML = ` <span>Show embed n°${selectEmbedID}</span><img src="assets/chevron.svg" alt="chevron icon">`;
    document.querySelector('.left').insertBefore(element ,btnAddEmbed);

    //update of attribute data-embedid
    document.querySelector('.embed-config').setAttribute('data-embedID', selectEmbedID);
    
    element.addEventListener('click', (e) => {
        const embedID = e.target.getAttribute('data-embed');
        resetValuesEmbed();
        showEmbedsValues(embedID);
    });
    saveEmbedConfig(selectEmbedID);
    enableEmbedConfig();
    changeActiveEmbed(selectEmbedID);
    // Delete the button if the numbers of embed is equal to 10
    if(embeds.length == 10) btnAddEmbed.remove();
}


/**
 * display the embed config infos
 * @param {integer} embedID 
 */
function showEmbedsValues(embedID){
    const embedObject = embeds.filter(embed => embed.id == embedID)[0];


    document.querySelector('.embed-config').setAttribute('data-embedID', embedID);
    document.querySelector('#title-embed').value = embedObject.title ;
    document.querySelector('#description-embed').value = embedObject.description; 
    document.querySelector('#image-embed').value = embedObject.image;
    document.querySelector('#thumbnail-embed').value = embedObject.thumbnail;
    document.querySelector("#footer-embed").value = embedObject.footer;
    document.querySelector("#color-embed").value = embedObject.color;

    embedObject.fields.forEach((field, index) => {
        const element = createField(index);
        element.querySelector('div:nth-of-type(1) input').value = field.name;
        element.querySelector('div:nth-of-type(2) input').value = field.value;
        element.querySelector('div:nth-of-type(3) input').checked = field.inline;
    })
    changeActiveEmbed(embedID);
}


/**
 * Disable all input on embed config
 */
function disableEmbedConfig(){
    document.querySelectorAll('.embed-config input').forEach(input=>input.setAttribute('disabled', true));
    document.querySelectorAll('.embed-config textarea').forEach(input=>input.setAttribute('disabled', true));
    document.querySelector('.embed-config').classList.add('disable');
    EMBED_CONFIG_DISABLED = true;
}
disableEmbedConfig();

/**
 * Enable all input on embed config
 */
function enableEmbedConfig(){
    if(document.querySelector('.embed-config').classList.contains('disable')){
        document.querySelectorAll('.embed-config input').forEach(input=>input.removeAttribute('disabled'));
        document.querySelectorAll('.embed-config textarea').forEach(input=>input.removeAttribute('disabled'));
        document.querySelector('.embed-config').classList.remove('disable');
        EMBED_CONFIG_DISABLED = false;
    }
}




/**
 * Send the embed to discord
 */
function sendEmbed(){

    const data = {};
    data.content = contentMessage.value;
   
    data.embeds = [];
    embeds.forEach(embed => {
        let embedData = {
                title: embed.title,
                description: embed.description,
                image: {url: embed.image},
                thumbnail: {url: embed.thumbnail},
                footer: {text: embed.footer},
                color: embed.color,
                fields: []
        }
        embed.fields.forEach(field => {
            embedData.fields.push({
                name: field.name,
                value: field.value,
                inline: field.inline
            });
        });
        data.embeds.push(embedData);
    });


    fetch(webhookUrl.value, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if(response.ok){
            alert("The embed was sent successfully");
        }else{
            alert("An error has occured, check the url and insert minimum one value on each embeds");
        }
    });
}


/**
 * Change the active btn embed into config
 * @param {embedID} int
 */
function changeActiveEmbed(embedID){
    const btns = [...document.querySelectorAll('.btn.show-embed')];;
    btns.forEach(btn => {
        btn.classList.remove('active');
    })
    document.querySelector(`.btn.show-embed[data-embed="${embedID}"]`).classList.add('active');
}


/**
 * Button delete embed
 */
document.querySelector('.btn.delete-embed').addEventListener('click', ()=>{
    const embedID =  document.querySelector('.embed-config').getAttribute('data-embedID');
    embeds.splice(embedID,1);
    document.querySelector(`.btn.show-embed[data-embed="${embedID}"]`).remove();
    if(embeds.length == 0){disableEmbedConfig()}
    else{
        showEmbedsValues(0);
        changeActiveEmbed(0);
        embedIDsAvailable.push(parseInt(embedID));
        console.log(embedIDsAvailable);
    }

    

});