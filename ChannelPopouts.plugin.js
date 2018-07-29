//META{"name":"ChannelPopouts","displayName":"ChannelPopouts","website":"","source":""}*//

let ChannelPopoutOnMouseEnter = function onMouseEnter(){
    let wrapper = document.createElement('div');
    let buttonLeft = parseInt(document.getElementsByName('ChannelPopout')[0].getBoundingClientRect().left) - 34;
    let buttonTop = parseInt(document.getElementsByName('ChannelPopout')[0].getBoundingClientRect().top) + 25;
    wrapper.innerHTML = `<div class='tooltip tooltip-bottom tooltip-black ChannelPopoutIcon' style='left: ` + buttonLeft.toString() + `px; top: ` + buttonTop.toString() + `px;'>Popout DM</div>`;
    document.querySelector('.tooltips').appendChild(wrapper.firstChild);
};

let ChannelPopoutOnMouseLeave = function onMouseLeave(){
    document.querySelector('.ChannelPopoutIcon').remove();
};

let ChannelPopoutOnMouseClick = function onMouseClick(){
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;

    var win = new BrowserWindow({ width: 800, height: 600, title: 'Discord', frame: false});
    win.on('close', () => {
        win.destroy();
    }); 
    win.loadURL(window.location.href);
    win.webContents.executeJavaScript(`document.querySelector('.channels-Ie2l6A').style.display = 'none'; document.querySelector('.guilds-wrapper').style.display = 'none';`);
    win.webContents.executeJavaScript(`var _betterDiscord = require(process.env.APPDATA + '/discord/0.0.301/modules/discord_desktop_core/node_modules/BetterDiscord');`);
    win.webContents.executeJavaScript(`var _betterDiscord2 = new _betterDiscord.BetterDiscord(require('electron').remote.getCurrentWindow());`);

    var _betterDiscord2 = new _betterDiscord.BetterDiscord(win);
};

let ChannelPopoutInjectHTML = function injectHTML(icon){
    let wrapper = document.createElement('div');

    if(icon && !document.getElementsByName("ChannelPopout")[0]){
        wrapper.innerHTML = `<span tabindex="0" class="iconMargin-2YXk4F da-iconMargin" role="button">
            <svg class="iconInactive-g2AXfB icon-1R19_H iconMargin-2YXk4F" name="ChannelPopout" width="16" height="16" viewBox="-8 -8 80 80" fill = "#fff">
                <g>
                    <g>
                        <g>
                            <polygon points="53,56 8,56 8,11 30,11 30,3 0,3 0,64 61,64 61,34 53,34"/>
                        </g>
                    </g>
                    <g>
                        <g>
                            <polygon points="42,0 50,8 33,25 39,31 56,14 64,23 64,0"/>
                        </g>
                    </g>
                </g>
            </svg>
        </span>`;
        icon.parentNode.prepend(wrapper.firstChild);
        
        document.getElementsByName("ChannelPopout")[0].setAttribute("onmouseenter", "ChannelPopoutOnMouseEnter()");
        document.getElementsByName("ChannelPopout")[0].setAttribute("onmouseleave", "ChannelPopoutOnMouseLeave()");
        document.getElementsByName("ChannelPopout")[0].setAttribute("onclick", "ChannelPopoutOnMouseClick()");
    }
}

let ChannelPopoutRemoveHTML = function removeHTML(){
    document.getElementsByName("ChannelPopout")[0].remove();
}


var ChannelPopouts = (() => {
    const config = {"info":{"name":"ChannelPopouts","authors":[{"name":"Green","discord_id":"80593258903773184","github_username":"greentwilight"}],"version":"1.0.0","description":"ChannelPopouts","github":"","github_raw":"https://raw.githubusercontent.com/Greentwilight/ChannelPopouts/master/ChannelPopouts.plugin.js"},"changelog":[{"title":"New Stuff","items":["Added more settings","Added changelog"]},{"title":"Bugs Squashed","type":"fixed","items":["React errors on reload"]},{"title":"Improvements","type":"improved","items":["Improvements to the base plugin"]},{"title":"On-going","type":"progress","items":["More modals and popouts being added","More classes and modules being added"]}],"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        getName() {return config.info.name;} getAuthor() {return config.info.authors.map(a => a.name).join(", ");} getDescription() {return config.info.description;} getVersion() {return config.info.version;}
        showAlert() {window.mainCore.alert("Library Missing",`The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/ZeresPluginLibrary/0PluginLibrary.plugin.js">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`);} load() {this.showAlert();} start() {this.showAlert();} stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {

    const {Logger, Patcher, Settings} = Library;


    return class ChannelPopouts extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            Logger.log("Started");
            Library.PluginUpdater.checkForUpdate(config.info.name, config.info.version, config.info.github_raw);
            if(document.getElementsByName("Pin")[0] && !document.getElementsByName("ChannelPopout")[0]){
                ChannelPopoutInjectHTML(document.getElementsByName("Pin")[0].parentNode);
            }
            let url = require("electron").remote.process.argv[2];
            
        }

        onStop() {
            ChannelPopoutRemoveHTML();
            Logger.log("Stopped");
        }

        observer(e){
            if(e.addedNodes[0] && e.addedNodes[0].classList && e.addedNodes[0].getAttribute("name") === "Pin" && !document.getElementsByName("ChannelPopout")[0]){
                let wrapper = document.createElement('div');
                ChannelPopoutInjectHTML(e.addedNodes[0].parentNode);
            }
        }
    };

};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
