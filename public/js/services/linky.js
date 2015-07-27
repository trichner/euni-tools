/**
 * Created by Thomas on 13.04.2015.
 *
 * https://image.eveonline.com/
 */

app.factory('Linky', function() {

    var thirdPartySearch = [
        ["PO Forums", "http://forum.eveuniversity.org/search.php?keywords={:character.name}&amp;terms=all&amp;" +
                  "author=&amp;fid[]=145&amp;sc=1&amp;sf=all&amp;sr=posts&amp;sk=t&amp;sd=d&amp;" +
                  "st=0&amp;ch=300&amp;t=0&amp;submit=Search"],
        ["Uni Forums","http://forum.eveuniversity.org/search.php?keywords=&amp;terms=all&amp;author={:character.name}&amp;sc=1&amp;sf=all&amp;sr=posts&amp;sk=t&amp;sd=d&amp;st=0&amp;ch=300&amp;t=0&amp;submit=Search"],
        ["Class Log","http://tools.eveuniversity.org/classlog/?u={:character.name}"],
        ["Eve Search","http://www.eve-search.com/search/%22{:character.name}%22"],
        ["Eve Stats", "http://www.eve-search.com/stats/{:character.name}"],
        ["Killboard", "http://killboard.eveuniversity.org/?a=search&amp;searchtype=pilot&amp;searchphrase={:character.name}"],
        ["Battleclinic","http://eve.battleclinic.com/killboard/combat_record.php?type=player&amp;name={:character.name}"],
        ["ZKillboard","https://zkillboard.com/character/{:character.id}"],
        ["Google","http://www.google.com/search?q=%22{:character.name}%22 %22EVE Online%22"],
        ["Old Tool", "http://eveuniapp.appspot.com/api?userID={:character.id}&amp;apikey=&amp;submit=1#tab-2"],
    ].map(function (arr) {
            return {title: arr[0], url: arr[1]}
        })

    var EVE_GATE_BIO = "https://gate.eveonline.com/Profile/{:character.name}/InfoPanel?tab=Bio"


    function substitute(url,character){
        var characterName = window.encodeURIComponent(character.name);
        var characterId = window.encodeURIComponent(character.id);
        return url.replace(/\{:character\.name\}/g,characterName).replace(/\{:character\.id\}/g,characterId);
    }

    return {
        urlsThirdPartySearch: function(character){
            return thirdPartySearch.map(function (entry) {
                entry.url = substitute(entry.url,character);
                return entry;
            });
        },
        urlEveGateBio : function(character){
            return substitute(EVE_GATE_BIO,character);
        }
    }
});