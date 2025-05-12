package LoL_Client_Back.dtos.enums;

public enum ServerOption {
    LAS("Latin America South (LAS)"),
    LAN("Latin America North (LAN)"),
    BR("Brazil (BR)"),
    NA("North America (NA)");

    private final String fullName;

    ServerOption(String fullName) {
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
