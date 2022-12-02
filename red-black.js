
function RedBlackTree(root){
    this._root = new Node(root,null,false);
}


function Node(val,parent,red){
    this.value = val;
    this.parent = parent;
    this.color = red ? 'red' : 'black';
    if(val !== null){
        this.children = [
            new Node(null,this,false),
            new Node(null,this,false)
        ];
    }
}


RedBlackTree.prototype.insert = function(value){

    var tree = this;


    function traverseAndInsert(node){
        if(value < node.value){
            if(node.children[0].value === null){
                node.children[0] = new Node(value,node,true);
                rebalance(node.children[0],node,0);
            } else {
                traverseAndInsert(node.children[0]);
            }
        } else if (value > node.value){
            if(node.children[1].value === null){
                node.children[1] = new Node(value,node,true);
                rebalance(node.children[1],node,1);
            } else {
                traverseAndInsert(node.children[1]);
            }
        }
    }


    function rebalance(node,parent,nodeSide){
        parent = parent || node.parent;


        if(parent === null){
            node.color = "black";


        } else if(node.color === "red" && parent.color === "red"){
            nodeSide = nodeSide || (parent.children[0].value === node.value ? 0 : 1);
            let gparent = parent.parent;
            let uncleSide = gparent.children[0].value === parent.value ? 1 : 0;
            let uncle = gparent.children[uncleSide];


            if(uncle.color === "red"){
                parent.color = uncle.color = "black";
                gparent.color = "red";
                rebalance(gparent);


            } else if (uncle.value === null || uncle.color === "black"){
                let sibSide = nodeSide === 0 ? 1 : 0;


                if(nodeSide !== uncleSide){
                    debugger;
                    let sib = parent.children[sibSide];

                    parent.parent = gparent.parent;
                    if(parent.parent === null){
                        tree._root = parent;
                    }
                    parent.color = "black";

                    gparent.parent = parent;
                    parent.children[uncleSide] = gparent;
                    gparent.color = "red";

                    gparent.children[nodeSide] = sib;
                    sib.parent = gparent;


                } else if (nodeSide === uncleSide){
                    node.parent = gparent.parent;
                    if(node.parent === null){
                        tree._root = node;
                    }
                    node.color = "black";

                    node.children[sibSide] = parent;
                    parent.parent = node;

                    node.children[nodeSide] = gparent;
                    gparent.parent = node;
                    gparent.color = "red";

                    gparent.children[sibSide] = new Node(null,gparent,false);
                    parent.children[nodeSide] = new Node(null,parent,false);
                }
            }
        }
    }

    //begin the insert process at the root
    traverseAndInsert(this._root);

}


RedBlackTree.prototype.search = function(value){

    function subtreeSearch(node){
        if (node.value === null) {
            return false;
        } else if(node.value === value){
            return node;
        } else if(value < node.value) {
            let left = subtreeSearch(node.children[0]);
            if(left){
                return left;
            }
        } else if(value > node.value) {
            let right = subtreeSearch(node.children[1]);
            if(right){
                return right;
            }
        }
    }

    
    return subtreeSearch(this._root);

}