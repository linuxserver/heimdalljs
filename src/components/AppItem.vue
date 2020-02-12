<template>
  <div class="list-item" :class="{ edit: this.edit }">
    <div class="list-item-inner">
      <div class="list-item-front">
        <div class="icon"><img class="app-icon" :src="'http://heimdallmaster.test/storage/' + this.icon"></div>
        <div class="name">
          {{ this.application.title }}
          <span class="tags">Tags: dashboard, dev, work</span>
          <a :href="this.application.url">url</a>
        </div>
        <div class="pinned">
          Active
          <q-icon
            :name="this.application.pinned === '1' ? 'check_box' : 'check_box_outline_blank'"
          />
        </div>
        <div class="actions">
          <q-btn size="12px" unelevated color="primary" @click="showBack()">Edit</q-btn>
          <q-btn size="12px" unelevated color="grey-2" text-color="black">Delete</q-btn>
        </div>
      </div>
      <div class="list-item-back">
        <span class="close" @click="hideBack()">Close</span>
        <div v-if="this.showback" class="inner" ref="innerHeight">
          <div id="create" class="create">
            <input type="hidden" name="_token" value="St25kITgoR7VYADJsYA0KBAAfTPcVYBQ5JqUR3dt">
            <div class="input">
                <label>Application name *</label>
                <input placeholder="Title" id="appname" class="form-control ui-autocomplete-input" name="title" type="text" value="NZBHydra" autocomplete="off">
            </div>
            <div class="input">
                <label>Application Type *</label>
                <select class="form-control config-item" id="apptype" data-config="type" name="class"><option value="null">None</option><option value="\App\SupportedApps\Adminer\Adminer">Adminer</option><option value="\App\SupportedApps\Airsonic\Airsonic">Airsonic</option><option value="\App\SupportedApps\Alertmanager\Alertmanager">Alertmanager</option><option value="\App\SupportedApps\ArchiveBox\ArchiveBox">ArchiveBox</option><option value="\App\SupportedApps\AVMFritzbox\AVMFritzbox">AVM Fritzbox</option><option value="\App\SupportedApps\Bazarr\Bazarr">Bazarr</option><option value="\App\SupportedApps\Bitwarden\Bitwarden">Bitwarden</option><option value="\App\SupportedApps\Booksonic\Booksonic">Booksonic</option><option value="\App\SupportedApps\Bookstack\Bookstack">Bookstack</option><option value="\App\SupportedApps\Cabot\Cabot">Cabot</option><option value="\App\SupportedApps\CalibreWeb\CalibreWeb">CalibreWeb</option><option value="\App\SupportedApps\Cardigann\Cardigann">Cardigann</option><option value="\App\SupportedApps\CheckMK\CheckMK">Check_MK</option><option value="\App\SupportedApps\CloudCMD\CloudCMD">Cloud CMD</option><option value="\App\SupportedApps\Cockpit\Cockpit">Cockpit</option><option value="\App\SupportedApps\CockpitCMS\CockpitCMS">Cockpit CMS</option><option value="\App\SupportedApps\Concourse\Concourse">Concourse</option><option value="\App\SupportedApps\Confluence\Confluence">Confluence</option><option value="\App\SupportedApps\CouchPotato\CouchPotato">CouchPotato</option><option value="\App\SupportedApps\CryptPad\CryptPad">CryptPad</option><option value="\App\SupportedApps\Deluge\Deluge">Deluge</option><option value="\App\SupportedApps\Directus\Directus">Directus</option><option value="\App\SupportedApps\DokuWiki\DokuWiki">DokuWiki</option><option value="\App\SupportedApps\Domoticz\Domoticz">Domoticz</option><option value="\App\SupportedApps\Drone\Drone">Drone</option><option value="\App\SupportedApps\Duplicacy\Duplicacy">Duplicacy</option><option value="\App\SupportedApps\Duplicati\Duplicati">Duplicati</option><option value="\App\SupportedApps\Emby\Emby">Emby</option><option value="\App\SupportedApps\FileBrowser\FileBrowser">FileBrowser</option><option value="\App\SupportedApps\Firefly\Firefly">Firefly 3</option><option value="\App\SupportedApps\FirefoxSend\FirefoxSend">Firefox Send</option><option value="\App\SupportedApps\FlexGet\FlexGet">FlexGet</option><option value="\App\SupportedApps\Flood\Flood">Flood</option><option value="\App\SupportedApps\Freenas\Freenas">Freenas</option><option value="\App\SupportedApps\FreshRSS\FreshRSS">FreshRSS</option><option value="\App\SupportedApps\Ghost\Ghost">Ghost</option><option value="\App\SupportedApps\Gitea\Gitea">Gitea</option><option value="\App\SupportedApps\GitHub\GitHub">GitHub</option><option value="\App\SupportedApps\GitLab\GitLab">GitLab</option><option value="\App\SupportedApps\Glances\Glances">Glances</option><option value="\App\SupportedApps\Gogs\Gogs">Gogs</option><option value="\App\SupportedApps\Gotify\Gotify">Gotify</option><option value="\App\SupportedApps\Grafana\Grafana">Grafana</option><option value="\App\SupportedApps\Grav\Grav">Grav</option><option value="\App\SupportedApps\Graylog\Graylog">Graylog</option><option value="\App\SupportedApps\Guacamole\Guacamole">Guacamole</option><option value="\App\SupportedApps\HAProxy\HAProxy">HAProxy</option><option value="\App\SupportedApps\Headphones\Headphones">Headphones</option><option value="\App\SupportedApps\Healthchecks\Healthchecks">Healthchecks</option><option value="\App\SupportedApps\HomeAssistant\HomeAssistant">HomeAssistant</option><option value="\App\SupportedApps\Huginn\Huginn">Huginn</option><option value="\App\SupportedApps\InvoiceNinja\InvoiceNinja">Invoice Ninja</option><option value="\App\SupportedApps\Jackett\Jackett">Jackett</option><option value="\App\SupportedApps\JDownloader\JDownloader">JDownloader</option><option value="\App\SupportedApps\Jeedom\Jeedom">Jeedom</option><option value="\App\SupportedApps\Jellyfin\Jellyfin">Jellyfin</option><option value="\App\SupportedApps\Jenkins\Jenkins">Jenkins</option><option value="\App\SupportedApps\Jira\Jira">Jira</option><option value="\App\SupportedApps\Jupyter\Jupyter">Jupyter</option><option value="\App\SupportedApps\Keycloak\Keycloak">Keycloak</option><option value="\App\SupportedApps\Kibana\Kibana">Kibana</option><option value="\App\SupportedApps\Kimai\Kimai">Kimai</option><option value="\App\SupportedApps\Krusader\Krusader">Krusader</option><option value="\App\SupportedApps\KubernetesDashboard\KubernetesDashboard">Kubernetes Dashboard</option><option value="\App\SupportedApps\LazyLibrarian\LazyLibrarian">LazyLibrarian</option><option value="\App\SupportedApps\LemonLDAPNG\LemonLDAPNG">LemonLDAP::NG</option><option value="\App\SupportedApps\Lidarr\Lidarr">Lidarr</option><option value="\App\SupportedApps\Mailcow\Mailcow">Mailcow</option><option value="\App\SupportedApps\MailcowSOGo\MailcowSOGo">MailcowSOGo</option><option value="\App\SupportedApps\Mailhog\Mailhog">Mailhog</option><option value="\App\SupportedApps\Mattermost\Mattermost">Mattermost</option><option value="\App\SupportedApps\MayanEDMS\MayanEDMS">Mayan EDMS</option><option value="\App\SupportedApps\McMyAdmin\McMyAdmin">McMyAdmin</option><option value="\App\SupportedApps\Medusa\Medusa">Medusa</option><option value="\App\SupportedApps\Meraki\Meraki">Meraki</option><option value="\App\SupportedApps\Miniflux\Miniflux">Miniflux</option><option value="\App\SupportedApps\Minio\Minio">Minio</option><option value="\App\SupportedApps\Monica\Monica">Monica</option><option value="\App\SupportedApps\MusicBrainz\MusicBrainz">MusicBrainz</option><option value="\App\SupportedApps\Mylar\Mylar">Mylar</option><option value="\App\SupportedApps\Netatmo\Netatmo">Netatmo</option><option value="\App\SupportedApps\Netdata\Netdata">Netdata</option><option value="\App\SupportedApps\Nextcloud\Nextcloud">Nextcloud</option><option value="\App\SupportedApps\NginxProxyManager\NginxProxyManager">Nginx Proxy Manager</option><option value="\App\SupportedApps\NodeRed\NodeRed">NodeRed</option><option value="\App\SupportedApps\NowShowing\NowShowing">NowShowing</option><option value="\App\SupportedApps\Nzbget\Nzbget">Nzbget</option><option value="\App\SupportedApps\NZBHydra\NZBHydra" selected="selected">NZBHydra</option><option value="\App\SupportedApps\Octoprint\Octoprint">Octoprint</option><option value="\App\SupportedApps\Ombi\Ombi">Ombi</option><option value="\App\SupportedApps\OmniDB\OmniDB">OmniDB</option><option value="\App\SupportedApps\openHAB\openHAB">openHAB</option><option value="\App\SupportedApps\openmediavault\openmediavault">openmediavault</option><option value="\App\SupportedApps\OPNsense\OPNsense">OPNsense</option><option value="\App\SupportedApps\Oscarr\Oscarr">Oscarr</option><option value="\App\SupportedApps\ownCloud\ownCloud">ownCloud</option><option value="\App\SupportedApps\OwnPhotos\OwnPhotos">OwnPhotos</option><option value="\App\SupportedApps\Paperless\Paperless">Paperless</option><option value="\App\SupportedApps\PartKeepr\PartKeepr">PartKeepr</option><option value="\App\SupportedApps\pfSense\pfSense">pfSense</option><option value="\App\SupportedApps\pgAdmin\pgAdmin">pgAdmin</option><option value="\App\SupportedApps\phpLDAPadmin\phpLDAPadmin">phpLDAPadmin</option><option value="\App\SupportedApps\phpMyAdmin\phpMyAdmin">phpMyAdmin</option><option value="\App\SupportedApps\Pihole\Pihole">Pihole</option><option value="\App\SupportedApps\Plex\Plex">Plex</option><option value="\App\SupportedApps\PlexRequests\PlexRequests">PlexRequests</option><option value="\App\SupportedApps\Portainer\Portainer">Portainer</option><option value="\App\SupportedApps\Privatebin\Privatebin">Privatebin</option><option value="\App\SupportedApps\ProjectSend\ProjectSend">ProjectSend</option><option value="\App\SupportedApps\Prometheus\Prometheus">Prometheus</option><option value="\App\SupportedApps\Proxmox\Proxmox">Proxmox</option><option value="\App\SupportedApps\pyLoad\pyLoad">pyLoad</option><option value="\App\SupportedApps\qBittorrent\qBittorrent">qBittorrent</option><option value="\App\SupportedApps\QNAP\QNAP">QNAP</option><option value="\App\SupportedApps\Radarr\Radarr">Radarr</option><option value="\App\SupportedApps\Rancher\Rancher">Rancher</option><option value="\App\SupportedApps\Raneto\Raneto">Raneto</option><option value="\App\SupportedApps\Recalbox\Recalbox">Recalbox</option><option value="\App\SupportedApps\ResilioSync\ResilioSync">Resilio Sync</option><option value="\App\SupportedApps\RocketChat\RocketChat">RocketChat</option><option value="\App\SupportedApps\Rspamd\Rspamd">Rspamd</option><option value="\App\SupportedApps\RuneAudio\RuneAudio">RuneAudio</option><option value="\App\SupportedApps\ruTorrent\ruTorrent">ruTorrent</option><option value="\App\SupportedApps\SABnzbd\SABnzbd">SABnzbd</option><option value="\App\SupportedApps\Seafile\Seafile">Seafile</option><option value="\App\SupportedApps\SearxMetasearchEngine\SearxMetasearchEngine">Searx Metasearch Engine</option><option value="\App\SupportedApps\Serviio\Serviio">Serviio</option><option value="\App\SupportedApps\Shaarli\Shaarli">Shaarli</option><option value="\App\SupportedApps\Shinobi\Shinobi">Shinobi</option><option value="\App\SupportedApps\SickBeard\SickBeard">SickBeard</option><option value="\App\SupportedApps\Sickchill\Sickchill">Sickchill</option><option value="\App\SupportedApps\Slack\Slack">Slack</option><option value="\App\SupportedApps\Snibox\Snibox">Snibox</option><option value="\App\SupportedApps\SOGo\SOGo">SOGo</option><option value="\App\SupportedApps\Sonarr\Sonarr">Sonarr</option><option value="\App\SupportedApps\Sourcegraph\Sourcegraph">Sourcegraph</option><option value="\App\SupportedApps\Squidex\Squidex">Squidex</option><option value="\App\SupportedApps\Strapi\Strapi">Strapi</option><option value="\App\SupportedApps\Syncthing\Syncthing">Syncthing</option><option value="\App\SupportedApps\Synology\Synology">Synology</option><option value="\App\SupportedApps\Taiga\Taiga">Taiga</option><option value="\App\SupportedApps\Tautulli\Tautulli">Tautulli</option><option value="\App\SupportedApps\TheLounge\TheLounge">TheLounge</option><option value="\App\SupportedApps\TinyTinyRSS\TinyTinyRSS">TinyTinyRSS</option><option value="\App\SupportedApps\Traccar\Traccar">Traccar</option><option value="\App\SupportedApps\Traefik\Traefik">Traefik</option><option value="\App\SupportedApps\Transmission\Transmission">Transmission</option><option value="\App\SupportedApps\Trilium\Trilium">Trilium</option><option value="\App\SupportedApps\TVHeadend\TVHeadend">TVHeadend</option><option value="\App\SupportedApps\Ubooquity\Ubooquity">Ubooquity</option><option value="\App\SupportedApps\UniFi\UniFi">UniFi</option><option value="\App\SupportedApps\Unraid\Unraid">Unraid</option><option value="\App\SupportedApps\Virtualmin\Virtualmin">Virtualmin</option><option value="\App\SupportedApps\VMwarevCenter\VMwarevCenter">VMwarevCenter</option><option value="\App\SupportedApps\Wallabag\Wallabag">Wallabag</option><option value="\App\SupportedApps\Watcher\Watcher">Watcher</option><option value="\App\SupportedApps\Webmin\Webmin">Webmin</option><option value="\App\SupportedApps\WebTools\WebTools">WebTools</option><option value="\App\SupportedApps\Wekan\Wekan">Wekan</option><option value="\App\SupportedApps\Wetty\Wetty">Wetty</option><option value="\App\SupportedApps\Xigmanas\Xigmanas">Xigmanas</option><option value="\App\SupportedApps\XWiki\XWiki">XWiki</option><option value="\App\SupportedApps\ZNC\ZNC">ZNC</option><option value="\App\SupportedApps\ZoneMinder\ZoneMinder">ZoneMinder</option><option value="\App\SupportedApps\Zulip\Zulip">Zulip</option></select>
            </div>

            <div class="input" style="position: relative;">
                <label>Colour *</label>
                <input placeholder="Hex colour" id="appcolour" class="form-control color-picker set-bg-elem" name="colour" type="text" value="#161b1f" style="background-color: rgb(0, 136, 255); color: white;">
            </div>

            <div class="input">
                <label>URL</label>
                <input placeholder="URL" id="appurl" class="form-control" name="url" type="text" value="http://192.168.0.20:5076/">
            </div>

            <div class="input">
                <label>Tags (Optional)</label>
                <select class="tags select2-hidden-accessible" multiple="" name="tags[]" data-select2-id="1" tabindex="-1" aria-hidden="true"><option value="0" selected="selected" data-select2-id="3">Home dashboard</option><option value="4">test</option></select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="2" style="width: 280px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1"><ul class="select2-selection__rendered"><li class="select2-selection__choice" title="Home dashboard" data-select2-id="4"><span class="select2-selection__choice__remove" role="presentation">×</span>Home dashboard</li><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" placeholder="" style="width: 0.75em;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
            </div>

            <div class="input">
                <div class="icon-container">
                    <div id="appimage">
                                        </div>
                    <div class="upload-btn-wrapper">
                        <button class="btn">Upload a file </button>
                        <input type="file" id="upload" name="file" data-com.bitwarden.browser.user-edited="yes">
                    </div>
                </div>
            </div>

            <div class="newblock" style="display: block;">
                <h2>Preview</h2>
            </div>

            <div id="tile-preview" class="input">
                <section class="item-container" data-id="">
                        <div class="item set-bg-elem" style="background-color: rgb(0, 136, 255); color: white;">
                                                        <img class="app-icon" src="http://heimdallmaster.test/img/heimdall-icon-small.png">
                                                        <div class="details">
                                <div class="title white">NZBHydra</div>
                                                            </div>
                            <a class="link white" href="http://192.168.0.20:5076/"><svg class="svg-inline--fa fa-arrow-alt-to-right fa-w-14" aria-hidden="true" data-prefix="fas" data-icon="arrow-alt-to-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M448 88v336c0 13.3-10.7 24-24 24h-24c-13.3 0-24-10.7-24-24V88c0-13.3 10.7-24 24-24h24c13.3 0 24 10.7 24 24zM24 320h136v87.7c0 17.8 21.5 26.7 34.1 14.1l152.2-152.2c7.5-7.5 7.5-19.8 0-27.3L194.1 90.1c-12.6-12.6-34.1-3.7-34.1 14.1V192H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24z"></path></svg><!-- <i class="fas fa-arrow-alt-to-right"></i> --></a>
                        </div>
                        <a class="item-edit" href="http://heimdallmaster.test/items/11/edit"><svg class="svg-inline--fa fa-pencil fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="pencil" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg><!-- <i class="fas fa-pencil"></i> --></a>
                    </section>
            </div>
            <div id="sapconfig"></div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AppItem',

  props: ['application'],

  components: {
  },

  data () {
    return {
      edit: false,
      showback: false,
      icon: this.application.icon || '../img/heimdall-icon-small.png'
    }
  },
  methods: {
    showBack: function () {
      this.edit = true
      this.showback = true
    },
    hideBack: function () {
      this.edit = false
      this.showback = false
    }
  }
}
</script>
<style lang="scss">

</style>
