{ pkgs ? import <nixpkgs> {} }:

pkgs.stdenv.mkDerivation {
  name = "node";

  buildInputs = [
    pkgs.sqlite
  ];

  nativeBuildInputs = [
    pkgs.nodejs-18_x
  ];
}
