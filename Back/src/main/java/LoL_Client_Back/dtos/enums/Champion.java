package LoL_Client_Back.dtos.enums;

public enum Champion {
    AATROX("Aatrox"),
    AKALI("Akali"),
    ALISTAR("Alistar"),
    AURELION_SOL("Aurelion Sol"),
    BARDO("Bardo"),
    BRAUM("Braum"),
    CAITLYN("Caitlyn"),
    CHOGATH("Cho´Gath"),
    DRAVEN("Draven"),
    DR_MUNDO("Dr. Mundo"),
    FIORA("Fiora"),
    FIZZ("Fizz"),
    GALIO("Galio"),
    GRAGAS("Gragas"),
    GRAVES("Graves"),
    HECARIM("Hecarim"),
    IVERN("Ivern"),
    JARVAN_IV("Jarvan IV"),
    JINX("Jinx"),
    KAISA("Kai´Sa"),
    KARMA("Karma"),
    KATARINA("Katarina"),
    KHAZIX("Kha´Zix"),
    LUCIAN("Lucian"),
    MALPHITE("Malphite"),
    MILIO("Milio"),
    MORDEKAISER("Mordekaiser"),
    ORNN("Ornn"),
    RENATA("Renata"),
    RENEKTON("Renekton"),
    REKSAI("Rek'Sai"),
    RENGAR("Rengar"),
    SENNA("Senna"),
    SHEN("Shen"),
    SINGED("Singed"),
    SKARNER("Skarner"),
    TRUNDLE("Trundle"),
    TRYNDAMERE("Tryndamere"),
    TWITCH("Twitch"),
    TWISTED_FATE("Twisted Fate"),
    URGOT("Urgot"),
    VI("Vi"),
    VLADIMIR("Vladimir"),
    WARWICK("Warwick"),
    XERATH("Xerath"),
    ZED("Zed"),
    ZERI("Zeri"),
    ZAC("Zac"),
    ZILEAN("Zilean");


    private final String displayName;

    Champion(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}