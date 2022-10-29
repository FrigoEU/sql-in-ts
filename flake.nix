{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/22.05";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = {self, nixpkgs, flake-utils} :
    flake-utils.lib.eachSystem ["x86_64-linux"]
      (system:
        let
          allPackages = import ./default.nix {
            pkgs = pkgs;
          };
        in
          {
            defaultPackage = allPackages;
            packages = allPackages;
            devShell = pkgs.mkShell {
              name = "school-env";
              buildInputs = [pkgs.nodePackages.sass
                             pkgs.python39Packages.weasyprint
                             pkgs.nodejs-18_x
                             pkgs.html2text

                             pkgsold.poedit
                            ];
              shellHook = ''
                export configurePhase=${allPackages.urweb.configurePhase}
                export prebuildPhase=${allPackages.urweb.prebuildPhase}
                export buildPhase=${allPackages.urweb.buildPhase}
              '';
            };
          }
      );
}
