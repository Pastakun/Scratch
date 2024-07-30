 l.inputs.bind("Y", "KeyY"), l.inputs.down.on("Y", (function(sine) { A.f.publish("YKeyPressed") 
     function Muscle(kinx,kiny,kinz){ (0, E.A()).setBlock(kinx,kiny,kinz,0); (0, E.Mb)(c.d.startBreakBlock, [kinx,kiny,kinz]); setTimeout(function(){ (0, E.Mb)(c.d.changeBlock, { toBlock: 0, pos: [kinx,kiny,kinz], checker: '' }, !0); }, 1000); } console.log("kinkin"); let pastaxyz = l.ents.getPosition(1).map(Math.floor); if(JSON.stringify(pastaxyz) !== JSON.stringify(window.pastaxyz2)){ window.pastaxyz2 = pastaxyz; let Tinko =prompt("nanma"); for(let man =Tinko;man<6;man++){ Muscle(pastaxyz[0],pastaxyz[1] - man,pastaxyz[2]); } } } )),
            l.inputs.bind("X", "KeyX"),
            l.inputs.down.on("X", (function(l) {
                A.f.publish("XKeyPressed")
            }
            )),
