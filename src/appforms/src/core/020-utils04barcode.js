appForm.utils = function (module) {

  var barcodeDecodeFunctions = 'function CropTable(e,t,n,r){if(n-e<Image.width&&n-e>0)Image.table=Image.table.slice(e,n);if(r-t<Image.height&&r-t>0){for(var i=0;i<Image.table.length;i++){Image.table[i]=Image.table[i].slice(t,r)}}if(Image.width!==Image.table.length||Image.height!==Image.table[0].length){Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}}function Log(e){postMessage({result:e,success:"log"})}function flipTable(){for(var e=0;e<Image.table.length;e++){Image.table[e].reverse()}Image.table.reverse();CreateImageData()}function rotateTableRight(){var e=[];var t=[];for(var n=Image.table[0].length-1;n>=0;n--){t=[];for(var r=0;r<Image.table.length;r++){t.push(Image.table[r][n])}e.push(t)}Image.table=e;Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}function rotateTableLeft(){var e=[];var t=[];for(var n=0;n<Image.table[0].length;n++){t=[];for(var r=Image.table.length-1;r>=0;r--){t.push(Image.table[r][n])}e.push(t)}Image.table=e;Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}function RemoveDist(){var e=0;var t=0;var n=[];var r;for(var i=0;i<Image.height;i++){e=0;t=0;for(var s=0;s<Image.width;s++){if((Image.table[s][i][0]+Image.table[s][i][1]+Image.table[s][i][2])/3<100){do{t++;s++;if(s>=Image.width){break}}while((Image.table[s][i][0]+Image.table[s][i][1]+Image.table[s][i][2])/3<100);if(s<Image.width){r=(Image.table[s][i][0]+Image.table[s][i][1]+Image.table[s][i][2])/3;do{e++;s++;if(s>=Image.width){e=0;break}}while((Image.table[s][i][0]+Image.table[s][i][1]+Image.table[s][i][2])/3>r)}if(e>t*4){n.push(s)}else{n.push(0)}s=Image.width}}}t=0;for(var o=0;o<n.length;o++){t+=n[o]}t/=n.length;if(t>20)CropTable(Math.floor(t),0,Image.width,Image.height)}function verticalAreas(){dataCopy=new Uint8ClampedArray(Image.data);if(LowLight){contrastBinary(dataCopy)}else{contrast(dataCopy,250);binary(dataCopy,100)}var e=Image.width*4*Math.round(Image.height/2);var t=[];var n;var r;for(var i=e;i<e+Image.width*4;i+=4){if(dataCopy[i]===0){n=i;break}}var s;var o=false;var u=n;for(var i=n;i<e+Image.width*4;i+=4){if(dataCopy[i]===255){r++;if(o==false){s=i;o=true}if(r>30){if(u-e>40){u-=40}t.push([(u-e)/4,(s-e)/4]);while(dataCopy[i]===255&&i<e+Image.width*4){i+=4}u=i}}else{r=0;o=false}}return t}function InterestAreas(e,t){dataCopy=new Uint8ClampedArray(Image.data);if(LowLight){contrastBinary(dataCopy)}else{contrast(dataCopy,250);binary(dataCopy,100)}var n=10;var r=6;var i=0;var s=-1;do{do{i=HorizontalArea(dataCopy,i,r);n--}while(typeof i==typeof 5&&n);if(i[1]-i[0]<25){if(r>1){i=i[1];r-=.5;n=10}}else{if(r>1){if(s!==i[0]){s=i[0];if(typeof i!==typeof 5)allAreas.push(i);i=i[1];r-=.5;n=10}else{i=0;r-=.5;n=10}}else{break}}}while(typeof i===typeof 5)}function CreateImageData(){Image.data=new Uint8ClampedArray(Image.width*Image.height*4);var e;for(var t=0;t<Image.height;t++){for(var n=0;n<Image.width;n++){e=t*4*Image.width;Image.data[e+n*4]=Image.table[n][t][0];Image.data[e+n*4+1]=Image.table[n][t][1];Image.data[e+n*4+2]=Image.table[n][t][2];Image.data[e+n*4+3]=Image.table[n][t][3]}}}function BlackEdges(e){var t=0;var n=[];for(var r=0;r<Image.height;r++){n.push([255,255,255,255])}for(var i=0;i<Image.width;i++){t=0;for(var s=0;s<Image.height;s++){t+=(Image.table[i][s][0]+Image.table[i][s][1]+Image.table[i][s][2])/3}t/=Image.height;if(t<e){Image.table[i]=n.slice()}else{Image.table[i]=n.slice();Image.table[i+1]=n.slice();break}}for(var i=Image.width-1;i>=0;i--){t=0;for(var s=0;s<Image.height;s++){t+=(Image.table[i][s][0]+Image.table[i][s][1]+Image.table[i][s][2])/3}t/=Image.height;if(t<e){Image.table[i]=n.slice()}else{break}}CreateImageData()}function CreateTable(){Image.table=[];var e=[];for(var t=0;t<Image.width*4;t+=4){e=[];for(var n=t;n<Image.data.length;n+=Image.width*4){e.push([Image.data[n],Image.data[n+1],Image.data[n+2],Image.data[n+3]])}Image.table.push(e)}}function EnlargeTable(e,t){var n=[];for(var r=0;r<Image.width;r++){n=[];for(var i=0;i<Image.height;i++){for(var s=0;s<e;s++){n.push(Image.table[r][i])}}Image.table[r]=n.slice()}n=Image.table.slice();for(var r=0;r<Image.width;r++){for(var s=0;s<t;s++){Image.table[r*t+s]=n[r].slice()}}Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}function ScaleHeight(e){var t=[];var n=0;var r=0;var i=0;for(var s=0;s<Image.height-e;s+=e){for(var o=0;o<Image.width;o++){n=0;r=0;i=0;for(var u=s;u<s+e;u++){n+=Image.table[o][u][0];r+=Image.table[o][u][1];i+=Image.table[o][u][2]}t.push(n/e);t.push(r/e);t.push(i/e);t.push(255)}}return new Uint8ClampedArray(t)}function ImgProcessing(){var e=new Uint8ClampedArray(Image.data);if(LowLight){contrastBinary(e)}else{contrast(e,255);binary(e,110)}var t=TrimBlack(e);CropTable(t[0],0,t[1],Image.height);allAreas=[];var n;var r=Image.table.slice();InterestAreas();if(allAreas.length===0){allAreas.push(averageLines())}if(Image.height-allAreas[allAreas.length-1][1]>30){CropTable(0,allAreas[allAreas.length-1][1],Image.width,Image.height);Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData();InterestAreas();Image.table=r.slice();Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData()}var i=[];Image.table=r.slice();Image.width=Image.table.length;Image.height=Image.table[0].length;for(var s=0;s<allAreas.length;s++){n=allAreas[s];if(n[1]>Image.height)n[1]=Image.height;CropTable(0,n[0],Image.width,n[1]);i.push(Image.table.slice());Image.table=r.slice();Image.width=Image.table.length;Image.height=Image.table[0].length}var o=i.length;for(var s=0;s<o;s++){Image.table=i[s];Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData();var u=verticalAreas();if(u.length>1){tempSecondTable=Image.table.slice();CropTable(0,0,u[0][1],Image.height);i[s]=Image.table.slice();for(var a=1;a<u.length;a++){Image.table=tempSecondTable.slice();Image.width=Image.table.length;Image.height=Image.table[0].length;CropTable(u[a][0],0,u[a][1],Image.height);i.push(Image.table.slice())}}}return i}function contrast(e,t){t=Math.max(0,Math.min(255,parseFloat(t)||127));var n=[];for(var r=0;r<256;r++){var i=Math.tan(t*Math.PI/180)*(r-127)+127;if(i>255){i=255}else if(i<0){i=0}n[r]=i|0}for(var r=0,s=Image.width*Image.height*4;r<s;r+=4){e[r]=n[e[r]];e[r+1]=n[e[r+1]];e[r+2]=n[e[r+2]]}}function binary(e,t){t=Math.max(0,Math.min(255,parseFloat(t)||127));var n;for(var r=0,i=Image.width*Image.height*4;r<i;r+=4){n=(e[r]+e[r+1]+e[r+2])/3;if(n<t){e[r]=e[r+1]=e[r+2]=0}else{e[r]=e[r+1]=e[r+2]=255}e[r+3]=255}}function TrimBlack(e){var t=[];var n=0;for(var r=0;r<e.length;r+=4){for(var i=r;i<e.length;i+=Image.width*4){n+=e[i]}if(n/Image.height>100){t.push(r/4%Image.width);break}n=0}n=0;for(var r=Image.width*4-4;r>0;r-=4){for(var i=r;i<e.length;i+=Image.width*4){n+=e[i]}if(n/Image.height>100){t.push(r/4%Image.width);break}n=0}return t}function HorizontalArea(e,t,n){t=typeof t!=="undefined"?t:1;t=t>0?t:1;var r=0;var i=0;var s=0;for(var o=t*4*Image.width;o<e.length/n;o+=Image.width*4){for(var u=0;u<Image.width*4;u+=4){s+=e[u+o]}if(s/Image.width>230){i=o;break}s=0}var a=0;s=0;if(i){for(var o=i;o<e.length;o+=Image.width*4){for(var u=0;u<Image.width*4;u+=4){if(e[u+o]===0){s++}}if(s>Image.width/5){r=o;break}s=0}}else{for(var o=t*4*Image.width;o<e.length;o+=Image.width*4){for(var u=0;u<Image.width*4;u+=4){s+=e[u+o]}if(s/Image.width>230){a=o;break}s=0}}if(i){return Math.round(r/4/Image.width)}else{return[t,Math.round(a/4/Image.width)]}}function averageLines(){var e=0;var t=[];for(var n=0;n<Image.data.length;n+=Image.width*4){e=0;for(var r=n;r<Image.width*4+n;r+=4){e+=(Image.data[r]+Image.data[r+1]+Image.data[r+2])/3}e/=Image.width;t.push(e)}var i=[];e=0;var s=t[0];for(var n=1;n<t.length;n++){if(Math.abs(t[n]-s)>13){i.push([e,n-1]);e=n;s=t[n]}}e=0;var o=[0,Image.height];for(var n=0;n<i.length;n++){if(i[n][1]-i[n][0]>e){e=i[n][1]-i[n][0];o=i[n]}}return o}function Main(){var e=ImgProcessing();var t=0;for(var n=0;n<e.length;n++){Image.table=e[n];Image.width=Image.table.length;Image.height=Image.table[0].length;CreateImageData();var r=averageLines();CropTable(0,r[0],Image.width,r[1]);BlackEdges(100);RemoveDist();var i=ScaleHeight(30);var s;var o=0;var u="";var a={};var f=[];r=false;do{s=yStraighten(i.subarray(o,o+Image.width*4));for(var l=0;l<FormatPriority.length;l++){if(u!="EAN-13"){if(FormatPriority[l]=="Code128"){r=BinaryString(s,0);if(r.string){u=r.format;r=r.string}}if(FormatPriority[l]=="Code93"){r=BinaryString(s,1);if(r)u="Code93"}if(FormatPriority[l]=="Code39"){r=BinaryString(s,2);if(r)u="Code39"}if(FormatPriority[l]=="2Of5"||FormatPriority[l]=="Inter2Of5"){if(FormatPriority[l]=="2Of5"){r=BinaryString(s,4);if(r)u="Standard 2 of 5"}else{r=BinaryString(s,5);if(r)u="Interleaved 2 of 5"}}}if(FormatPriority[l]=="EAN-13"){var c=BinaryString(s,3);r=c.string;if(r){u="EAN-13";if(typeof a[r]=="undefined"){a[r]={count:1,correction:c.correction};f.push(r)}else{a[r].count=a[r].count+1;a[r].correction=a[r].correction+c.correction}if(!Ean13Speed)r=false}}if(r)break}o+=Image.width*4}while(!r&&o<i.length);if(r&&u!="EAN-13"){postMessage({result:[u+": "+r],success:true,finished:false});t++}if(u=="EAN-13"&&!Ean13Speed)r=false;if(!r){EnlargeTable(4,2);o=0;i=ScaleHeight(20);do{s=yStraighten(i.subarray(o,o+Image.width*4));for(var l=0;l<FormatPriority.length;l++){if(u!="EAN-13"){if(FormatPriority[l]=="Code128"){r=BinaryString(s,0);if(r.string){u=r.format;r=r.string}}if(FormatPriority[l]=="Code93"){r=BinaryString(s,1);if(r)u="Code93"}if(FormatPriority[l]=="Code39"){r=BinaryString(s,2);if(r)u="Code39"}if(FormatPriority[l]=="2Of5"||FormatPriority[l]=="Inter2Of5"){if(FormatPriority[l]=="2Of5"){r=BinaryString(s,4);if(r)u="Standard 2 of 5"}else{r=BinaryString(s,5);if(r)u="Interleaved 2 of 5"}}}if(FormatPriority[l]=="EAN-13"){var c=BinaryString(s,3);r=c.string;if(r){u="EAN-13";if(typeof a[r]=="undefined"){a[r]={count:1,correction:c.correction};f.push(r)}else{a[r].count=a[r].count+1;a[r].correction=a[r].correction+c.correction}if(!Ean13Speed)r=false}}if(r)break}o+=Image.width*4}while(!r&&o<i.length);if(r&&u!="EAN-13"){postMessage({result:[u+": "+r],success:true,finished:false});t++}}if(u=="EAN-13"){var h={};for(var p in a){a[p].correction=a[p].correction/a[p].count;var d=a[p].correction;if(Ean13Speed){d-=a[p].count*4}else{d-=a[p].count}d+=f.indexOf(p);h[p]=d}var v=Number.POSITIVE_INFINITY;var m="";for(var p in h){if(h[p]<v){v=h[p];m=p}}if(v<11){r=m}else{r=false}if(r){postMessage({result:[u+": "+r],success:true,finished:false});t++}}if(t>=DecodeNr)break}return[]}function yStraighten(e){var t=0;var n;var r=new Uint8ClampedArray(Image.width*150*4);for(var i=0;i<r.length;i++){r[i]=255}for(var i=0;i<Image.width*4;i+=4){n=180;t=(e[i]+e[i+1]+e[i+2])/3;t+=(e[i+4]+e[i+5]+e[i+6])/3;t/=2;for(var s=i;s<r.length;s+=Image.width*4){if(t<n){r[s]=r[s+1]=r[s+2]=0}n--}}return r}function TwoOfFiveStartEnd(e,t){if(e.length<5||e.length>6)return false;var n=[[0,0],[0,0]];for(var r=0;r<e.length;r++){if(e[r]>n[0][0]){n[0][0]=e[r];var i=n[0][1];n[0][1]=r;r=i}if(e[r]>n[1][0]&&r!=n[0][1]){n[1][0]=e[r];n[1][1]=r}}var s=n[0][0]+n[1][0];s/=2;if(n[0][0]/s>1.2||n[0][0]/s<.8)return false;if(n[1][0]/s>1.2||n[1][0]/s<.8)return false;var o=0;for(var u=0;u<e.length;u++){if(u==n[0][1]||u==n[1][1])continue;o+=e[u]}o/=e.length-2;for(var u=0;u<e.length;u++){if(u==n[0][1]||u==n[1][1])continue;if(e[u]/o>1.4||e[u]/o<.6)return false}if(t){return(n[0][1]==0||n[0][1]==2)&&(n[1][1]==0||n[1][1]==2)}else{return(n[0][1]==0||n[0][1]==4)&&(n[1][1]==0||n[1][1]==4)}}function CheckInterleaved(e,t){var n=0;for(var r=0;r<e.length;r++){n+=e[r]}n/=4;if(t){if(e.length!=4)return false;for(var r=0;r<e.length;r++){if(e[r]/n<.8||e[r]/n>1.2)return false}return true}else{if(e.length!=3)return false;var i=0;var s;for(var r=0;r<e.length;r++){if(e[r]>i){i=e[r];s=r}}if(s!=0)return false;if(e[0]/n<1.5||e[0]/n>2.5)return false;for(var r=1;r<e.length;r++){if(e[r]/n<.5||e[r]/n>1.5)return false}return true}}function contrastBinary(e){var t=127*3;var n=128*3;for(var r=0,i=Image.width*Image.height*4;r<i;r+=4){var s=e[r]+e[r+1]+e[r+2];if(s<t){t=s}else if(s>n){n=s}}var o=(n+t)/2;for(var r=0,i=Image.width*Image.height*4;r<i;r+=4){ave=e[r]+e[r+1]+e[r+2];if(ave<o){e[r]=e[r+1]=e[r+2]=0}else{e[r]=e[r+1]=e[r+2]=255}e[r+3]=255}}function BinaryString(e,t){var n=[];var r=[];var i=0;var s;var o;var u;var a=false;if(t==0){u=6}if(t==1){u=6}if(t==2){u=9}if(t==3){u=4}if(t==4){u=5}if(t==5){u=10}var f=false;var l=255;var c=false;var h=0;var p=0;for(var d=0;d<e.length-Image.width*4;d+=Image.width*4){var v=e.subarray(d,d+Image.width*4);o=BarLength(v);p=0;if(t==0||t==4)o/=2;n=[];s=0;r=[];binTempInter=[];f=false;var m=false;for(var g=0;g<v.length;g+=4){i=0;if(!f&&v[g]===0){f=true;c=true;if(t==4){l=v[g];var y=[0,0,0,0,0,0];do{y[i]=y[i]+1;g+=4;if(l!=v[g]){i++;l=v[g]}}while(i<6&&g<v.length);if(!TwoOfFiveStartEnd(y,true)){break}i=0}if(t==5){l=v[g];var b=[0,0,0,0];do{b[i]=b[i]+1;g+=4;if(l!=v[g]){i++;l=v[g]}}while(i<4&&g<v.length);if(!CheckInterleaved(b,true))break;i=0}}if(f){l=v[g];do{i++;g+=4;if(t==5&&i/o>5){var w=[];for(var E=0;E<r.length;E++){w.push(r[E]);if(E>=binTempInter.length)continue;w.push(binTempInter[E])}if(!CheckInterleaved(w,false)){n=[];break}else{break}}if(g>=v.length)break}while(v[g]===l);if(t==2&&a){a=false;continue}if(t!=4||t!=5)i/=o;if(t==5){if(l==0){r.push(i)}else{binTempInter.push(i)}}else{r.push(i)}s++;if(t==4&&v[g]==255){var S=0;do{S++;g+=4;if(S/o>3){if(!TwoOfFiveStartEnd(r,false)){n=[];break}else{break}}}while(v[g]==255&&g<v.length)}if(t==4&&g>=v.length-4){do{g-=4}while(v[g]==255&&g>=0);l=v[g];var y=[0,0,0,0,0];i=0;do{y[i]=y[i]+1;g-=4;if(l!=v[g]){i++;l=v[g]}}while(i<5&&g>=0);if(!TwoOfFiveStartEnd(y,false)){n=[];break}else{break}i=0}if(s==3&&t==3&&c){s=0;r=[];c=false}if(s===u){if(t==3&&h==6){h=0;s=0;if(m){u=4}r=[];continue}if(h==5&&!m){m=true;u=5}n.push(r);s=0;r=[];if(t==5){n.push(binTempInter);binTempInter=[]}if(t==3)h++;if(t==2)a=true}g-=4;if(t==3&&n.length>12)break}}r=Distribution(n,t);if(t==3){n=r.data;p=r.correction}else{n=r}if(n.length>4){if(t==0){if(CheckCode128(n)){n=DecodeCode128(n);break}}else if(t==1){if(CheckCode93(n)){n=DecodeCode93(n);break}}else if(t==2){if(CheckCode39(n)){n=DecodeCode39(n);break}}else if(t==3){var x=DecodeEAN13(n);if(x){if(x.length===13){n=x;break}}}else if(t==4||t==5){var x=Decode2Of5(n);if(x){n=x;break}}}}if(t==0){if(typeof n.string==="string"){return n}else{return false}}if(typeof n==="string"){if(t==3){return{string:n,correction:p}}else{return n}}else{return false}}function BarLength(e){var t=0;for(var n=0;n<e.length;n+=4){if(e[n]===0){do{t++;n+=4}while(e[n]===0);break}}return t}function Distribution(e,t){var n=0;var r=[];var i;var s;var o;if(t===0){s=11;i=6;o=4}else if(t===1){s=9;i=6;o=4}else if(t===2){s=12;i=9}else if(t===3){s=7;i=4;o=4}for(var u=0;u<e.length;u++){var a=e[u];var f=0;f=0;var l=0;var c=[];var h=[];var p=[];if(t==4||t==5){var d=[[0,0],[0,0]];for(var v=0;v<a.length;v++){if(!isFinite(a[v]))return[];if(a[v]>d[0][0]){d[0][0]=a[v];var m=d[0][1];d[0][1]=v;v=m-1}if(a[v]>d[1][0]&&v!=d[0][1]){d[1][0]=a[v];d[1][1]=v}}if(Secure2Of5){wideAvrg=d[0][0]+d[1][0];wideAvrg/=2;if(d[0][0]/wideAvrg>1.2||d[0][0]/wideAvrg<.8)return[];if(d[1][0]/wideAvrg>1.2||d[1][0]/wideAvrg<.8)return[];narrowAvrg=0;for(var v=0;v<a.length;v++){if(v==d[0][1]||v==d[1][1])continue;narrowAvrg+=a[v]}narrowAvrg/=3;for(var v=0;v<a.length;v++){if(v==d[0][1]||v==d[1][1])continue;if(a[v]/narrowAvrg>1.2||a[v]/narrowAvrg<.7)return[]}}for(var v=0;v<a.length;v++){if(v==d[0][1]||v==d[1][1]){c.push(1);continue}c.push(0)}r.push(c);continue}while(l<i){f+=a[l];l++}if(t===2){var g=[];for(var v=0;v<3;v++){var d=0;var y;for(var b=0;b<a.length;b++){if(g.indexOf(b)!=-1)continue;if(a[b]>d){y=b;d=a[b]}}p.push(d);g.push(y)}for(var b=0;b<a.length;b++){if(g.indexOf(b)===-1){h.push(a[b])}}var w=0;for(var b=0;b<h.length;b++){w+=h[b]}w/=h.length;var E=0;for(var b=0;b<p.length;b++){E+=p[b]}E/=p.length;o=E/w}l=0;while(l<i){c.push(a[l]/f*s);l++}l=0;while(l<i){if(t==2){c[l]=Math.abs(1-c[l])<Math.abs(o-c[l])?1:2}else{c[l]=c[l]>o?o:c[l];c[l]=c[l]<1?1:c[l];c[l]=Math.round(c[l])}l++}if(t==3){var S=0;for(var v=0;v<c.length;v++){S+=c[v]}if(S>7){var d=0;var x=0;for(var v=0;v<c.length;v++){if(c[v]>d){d=c[v];x=v}}c[x]=d-(S-7)}}if(t==3){for(var v=0;v<c.length;v++){n+=Math.abs(c[v]-a[v]/f*s)}}r.push(c)}if(t==3){return{data:r,correction:n}}else{return r}}function CheckCode128(e){var t=e[e.length-2].join("");t=Code128Encoding.value.indexOf(t);var n=t!=-1;var r=Code128Encoding.value.indexOf(e[0].join(""));n=r===-1?false:n;for(var i=1;i<e.length-2;i++){r+=Code128Encoding.value.indexOf(e[i].join(""))*i;n=Code128Encoding.value.indexOf(e[i].join(""))===-1?false:n}return r%103===t&&n}function Decode2Of5(e){var t="";for(var n=0;n<e.length;n++){if(TwoOfFiveEncoding.indexOf(e[n].join(""))==-1)return false;t+=TwoOfFiveEncoding.indexOf(e[n].join(""))}return t}function DecodeEAN13(e){if(e.length!=12)return false;var t=e.slice(0,6);var n=false;var r=e.slice(6,e.length);for(var i=0;i<t.length;i++){var e="";for(var s=0;s<t[i][0];s++){e+="0"}for(var s=0;s<t[i][1];s++){e+="1"}for(var s=0;s<t[i][2];s++){e+="0"}for(var s=0;s<t[i][3];s++){e+="1"}t[i]=e;if(t[i].length!=7){n=true;break}}if(n)return false;for(var i=0;i<r.length;i++){var e="";for(var s=0;s<r[i][0];s++){e+="1"}for(var s=0;s<r[i][1];s++){e+="0"}for(var s=0;s<r[i][2];s++){e+="1"}for(var s=0;s<r[i][3];s++){e+="0"}r[i]=e;if(r[i].length!=7){n=true;break}}if(n)return false;var o=[];for(var i=0;i<t.length;i++){if(typeof EAN13Encoding["L"][t[i]]!="undefined"){o.push("L")}else if(typeof EAN13Encoding["G"][t[i]]!="undefined"){o.push("G")}else{n=true;break}}if(n)return false;var u=[];if(typeof EAN13Encoding.formats[o.join("")]=="undefined")return false;u.push(EAN13Encoding.formats[o.join("")]);for(var i=0;i<t.length;i++){if(typeof EAN13Encoding[o[i]][t[i]]=="undefined"){n=true;break}u.push(EAN13Encoding[o[i]][t[i]])}if(n)return false;for(var i=0;i<r.length;i++){if(typeof EAN13Encoding["R"][r[i]]=="undefined"){n=true;break}u.push(EAN13Encoding["R"][r[i]])}if(n)return false;var a=3;var f=0;for(var i=u.length-2;i>=0;i--){f+=u[i]*a;if(a==3){a=1}else{a=3}}f=(10-f%10)%10;if(u[u.length-1]==f){return u.join("")}else{return false}}function CheckCode93(e){var t=e[e.length-3].join("");var n=e[e.length-2].join("");var r=true;if(typeof Code93Encoding[t]=="undefined")return false;if(typeof Code93Encoding[n]=="undefined")return false;var i=Code93Encoding[t].value;var s=1;var o=0;for(var u=e.length-4;u>0;u--){r=typeof Code93Encoding[e[u].join("")]==="undefined"?false:r;if(!r)break;o+=Code93Encoding[e[u].join("")].value*s;s++;if(s>20)s=1}var a=o%47;var f=a===i;if(!f)return false;if(!r)return false;o=a;s=2;i=Code93Encoding[n].value;for(var u=e.length-4;u>0;u--){r=typeof Code93Encoding[e[u].join("")]==="undefined"?false:r;if(!r)break;o+=Code93Encoding[e[u].join("")].value*s;s++;if(s>15)s=1}var l=o%47;var c=l===i;return c&&f}function CheckCode39(e){var t=true;if(typeof Code39Encoding[e[0].join("")]=="undefined")return false;if(Code39Encoding[e[0].join("")].character!="*")return false;if(typeof Code39Encoding[e[e.length-1].join("")]=="undefined")return false;if(Code39Encoding[e[e.length-1].join("")].character!="*")return false;for(var n=1;n<e.length-1;n++){if(typeof Code39Encoding[e[n].join("")]=="undefined"){t=false;break}}return t}function DecodeCode39(e){var t="";var n=false;var r="";var i="";for(var s=1;s<e.length-1;s++){r=Code39Encoding[e[s].join("")].character;if(r=="$"||r=="/"||r=="+"||r=="%"){n=true;i=r;continue}if(n){if(typeof ExtendedEncoding[i+r]=="undefined"){if(ExtendedExceptions.indexOf(r)!=-1)t+=r}else{t+=ExtendedEncoding[i+r]}n=false;continue}t+=r}return t}function DecodeCode93(e){var t="";var n=false;var r="";var i="";for(var s=1;s<e.length-3;s++){r=Code93Encoding[e[s].join("")].character;if(r=="($)"||r=="(/)"||r=="(+)"||r=="(%)"){n=true;i=r[1];continue}if(n){if(typeof ExtendedEncoding[i+r]=="undefined"){if(ExtendedExceptions.indexOf(r)!=-1)t+=r}else{t+=ExtendedEncoding[i+r]}n=false;continue}t+=r}return t}function DecodeCode128(e){var t=Code128Encoding[e[0].join("")];var n;var r="Code128";var i="";for(var s=1;s<e.length-2;s++){n=Code128Encoding[e[s].join("")][t];switch(n){case"FNC1":if(s==1)r="GS1-128";case"FNC2":case"FNC3":case"FNC4":break;case"SHIFT_B":s++;i+=Code128Encoding[e[s].join("")]["B"];break;case"SHIFT_A":s++;i+=Code128Encoding[e[s].join("")]["A"];break;case"Code_A":t="A";break;case"Code_B":t="B";break;case"Code_C":t="C";break;default:i+=n}}return{string:i,format:r}}TwoOfFiveEncoding=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"];Code128Encoding={212222:{A:" ",B:" ",C:"00"},222122:{A:"!",B:"!",C:"01"},222221:{A:\'"\',B:\'"\',C:"02"},121223:{A:"#",B:"#",C:"03"},121322:{A:"$",B:"$",C:"04"},131222:{A:"%",B:"%",C:"05"},122213:{A:"&",B:"&",C:"06"},122312:{A:"\'",B:"\'",C:"07"},132212:{A:"(",B:"(",C:"08"},221213:{A:")",B:")",C:"09"},221312:{A:"*",B:"*",C:"10"},231212:{A:"+",B:"+",C:"11"},112232:{A:",",B:",",C:"12"},122132:{A:"-",B:"-",C:"13"},122231:{A:".",B:".",C:"14"},113222:{A:"/",B:"/",C:"15"},123122:{A:"0",B:"0",C:"16"},123221:{A:"1",B:"1",C:"17"},223211:{A:"2",B:"2",C:"18"},221132:{A:"3",B:"3",C:"19"},221231:{A:"4",B:"4",C:"20"},213212:{A:"5",B:"5",C:"21"},223112:{A:"6",B:"6",C:"22"},312131:{A:"7",B:"7",C:"23"},311222:{A:"8",B:"8",C:"24"},321122:{A:"9",B:"9",C:"25"},321221:{A:":",B:":",C:"26"},312212:{A:";",B:";",C:"27"},322112:{A:"<",B:"<",C:"28"},322211:{A:"=",B:"=",C:"29"},212123:{A:">",B:">",C:"30"},212321:{A:"?",B:"?",C:"31"},232121:{A:"@",B:"@",C:"32"},111323:{A:"A",B:"A",C:"33"},131123:{A:"B",B:"B",C:"34"},131321:{A:"C",B:"C",C:"35"},112313:{A:"D",B:"D",C:"36"},132113:{A:"E",B:"E",C:"37"},132311:{A:"F",B:"F",C:"38"},211313:{A:"G",B:"G",C:"39"},231113:{A:"H",B:"H",C:"40"},231311:{A:"I",B:"I",C:"41"},112133:{A:"J",B:"J",C:"42"},112331:{A:"K",B:"K",C:"43"},132131:{A:"L",B:"L",C:"44"},113123:{A:"M",B:"M",C:"45"},113321:{A:"N",B:"N",C:"46"},133121:{A:"O",B:"O",C:"47"},313121:{A:"P",B:"P",C:"48"},211331:{A:"Q",B:"Q",C:"49"},231131:{A:"R",B:"R",C:"50"},213113:{A:"S",B:"S",C:"51"},213311:{A:"T",B:"T",C:"52"},213131:{A:"U",B:"U",C:"53"},311123:{A:"V",B:"V",C:"54"},311321:{A:"W",B:"W",C:"55"},331121:{A:"X",B:"X",C:"56"},312113:{A:"Y",B:"Y",C:"57"},312311:{A:"Z",B:"Z",C:"58"},332111:{A:"[",B:"[",C:"59"},314111:{A:"\\",B:"\\",C:"60"},221411:{A:"]",B:"]",C:"61"},431111:{A:"^",B:"^",C:"62"},111224:{A:"_",B:"_",C:"63"},111422:{A:"NUL",B:"`",C:"64"},121124:{A:"SOH",B:"a",C:"65"},121421:{A:"STX",B:"b",C:"66"},141122:{A:"ETX",B:"c",C:"67"},141221:{A:"EOT",B:"d",C:"68"},112214:{A:"ENQ",B:"e",C:"69"},112412:{A:"ACK",B:"f",C:"70"},122114:{A:"BEL",B:"g",C:"71"},122411:{A:"BS",B:"h",C:"72"},142112:{A:"HT",B:"i",C:"73"},142211:{A:"LF",B:"j",C:"74"},241211:{A:"VT",B:"k",C:"75"},221114:{A:"FF",B:"l",C:"76"},413111:{A:"CR",B:"m",C:"77"},241112:{A:"SO",B:"n",C:"78"},134111:{A:"SI",B:"o",C:"79"},111242:{A:"DLE",B:"p",C:"80"},121142:{A:"DC1",B:"q",C:"81"},121241:{A:"DC2",B:"r",C:"82"},114212:{A:"DC3",B:"s",C:"83"},124112:{A:"DC4",B:"t",C:"84"},124211:{A:"NAK",B:"u",C:"85"},411212:{A:"SYN",B:"v",C:"86"},421112:{A:"ETB",B:"w",C:"87"},421211:{A:"CAN",B:"x",C:"88"},212141:{A:"EM",B:"y",C:"89"},214121:{A:"SUB",B:"z",C:"90"},412121:{A:"ESC",B:"{",C:"91"},111143:{A:"FS",B:"|",C:"92"},111341:{A:"GS",B:"}",C:"93"},131141:{A:"RS",B:"~",C:"94"},114113:{A:"US",B:"DEL",C:"95"},114311:{A:"FNC3",B:"FNC3",C:"96"},411113:{A:"FNC2",B:"FNC2",C:"97"},411311:{A:"SHIFT_B",B:"SHIFT_A",C:"98"},113141:{A:"Code_C",B:"Code_C",C:"99"},114131:{A:"Code_B",B:"FNC4",C:"Code_B"},311141:{A:"FNC4",B:"Code_A",C:"Code_A"},411131:{A:"FNC1",B:"FNC1",C:"FNC1"},211412:"A",211214:"B",211232:"C",233111:{A:"STOP",B:"STOP",C:"STOP"},value:["212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","233111"]};Code93Encoding={131112:{value:0,character:"0"},111213:{value:1,character:"1"},111312:{value:2,character:"2"},111411:{value:3,character:"3"},121113:{value:4,character:"4"},121212:{value:5,character:"5"},121311:{value:6,character:"6"},111114:{value:7,character:"7"},131211:{value:8,character:"8"},141111:{value:9,character:"9"},211113:{value:10,character:"A"},211212:{value:11,character:"B"},211311:{value:12,character:"C"},221112:{value:13,character:"D"},221211:{value:14,character:"E"},231111:{value:15,character:"F"},112113:{value:16,character:"G"},112212:{value:17,character:"H"},112311:{value:18,character:"I"},122112:{value:19,character:"J"},132111:{value:20,character:"K"},111123:{value:21,character:"L"},111222:{value:22,character:"M"},111321:{value:23,character:"N"},121122:{value:24,character:"O"},131121:{value:25,character:"P"},212112:{value:26,character:"Q"},212211:{value:27,character:"R"},211122:{value:28,character:"S"},211221:{value:29,character:"T"},221121:{value:30,character:"U"},222111:{value:31,character:"V"},112122:{value:32,character:"W"},112221:{value:33,character:"X"},122121:{value:34,character:"Y"},123111:{value:35,character:"Z"},121131:{value:36,character:"-"},311112:{value:37,character:"."},311211:{value:38,character:" "},321111:{value:39,character:"$"},112131:{value:40,character:"/"},113121:{value:41,character:"+"},211131:{value:42,character:"%"},121221:{value:43,character:"($)"},312111:{value:44,character:"(%)"},311121:{value:45,character:"(/)"},122211:{value:46,character:"(+)"},111141:{value:-1,character:"*"}};Code39Encoding={111221211:{value:0,character:"0"},211211112:{value:1,character:"1"},112211112:{value:2,character:"2"},212211111:{value:3,character:"3"},111221112:{value:4,character:"4"},211221111:{value:5,character:"5"},112221111:{value:6,character:"6"},111211212:{value:7,character:"7"},211211211:{value:8,character:"8"},112211211:{value:9,character:"9"},211112112:{value:10,character:"A"},112112112:{value:11,character:"B"},212112111:{value:12,character:"C"},111122112:{value:13,character:"D"},211122111:{value:14,character:"E"},112122111:{value:15,character:"F"},111112212:{value:16,character:"G"},211112211:{value:17,character:"H"},112112211:{value:18,character:"I"},111122211:{value:19,character:"J"},211111122:{value:20,character:"K"},112111122:{value:21,character:"L"},212111121:{value:22,character:"M"},111121122:{value:23,character:"N"},211121121:{value:24,character:"O"},112121121:{value:25,character:"P"},111111222:{value:26,character:"Q"},211111221:{value:27,character:"R"},112111221:{value:28,character:"S"},111121221:{value:29,character:"T"},221111112:{value:30,character:"U"},122111112:{value:31,character:"V"},222111111:{value:32,character:"W"},121121112:{value:33,character:"X"},221121111:{value:34,character:"Y"},122121111:{value:35,character:"Z"},121111212:{value:36,character:"-"},221111211:{value:37,character:"."},122111211:{value:38,character:" "},121212111:{value:39,character:"$"},121211121:{value:40,character:"/"},121112121:{value:41,character:"+"},111212121:{value:42,character:"%"},121121211:{value:-1,character:"*"}};ExtendedEncoding={"/A":"!","/B":\'"\',"/C":"#","/D":"$","/E":"%","/F":"&","/G":"\'","/H":"(","/I":")","/J":"*","/K":"+","/L":",","/O":"/","/Z":":","%F":";","%G":"<","%H":"=","%I":">","%J":"?","%K":"[","%L":"\\","%M":"]","%N":"^","%O":"_","+A":"a","+B":"b","+C":"c","+D":"d","+E":"e","+F":"f","+G":"g","+H":"h","+I":"i","+J":"j","+K":"k","+L":"l","+M":"m","+N":"n","+O":"o","+P":"p","+Q":"q","+R":"r","+S":"s","+T":"t","+U":"u","+V":"v","+W":"w","+X":"x","+Y":"y","+Z":"z","%P":"{","%Q":"|","%R":"|","%S":"~"};ExtendedExceptions=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","-","."];EAN13Encoding={L:{"0001101":0,"0011001":1,"0010011":2,"0111101":3,"0100011":4,"0110001":5,"0101111":6,"0111011":7,"0110111":8,"0001011":9},G:{"0100111":0,"0110011":1,"0011011":2,"0100001":3,"0011101":4,"0111001":5,"0000101":6,"0010001":7,"0001001":8,"0010111":9},R:{1110010:0,1100110:1,1101100:2,1000010:3,1011100:4,1001110:5,101e4:6,1000100:7,1001e3:8,1110100:9},formats:{LLLLLL:0,LLGLGG:1,LLGGLG:2,LLGGGL:3,LGLLGG:4,LGGLLG:5,LGGGLL:6,LGLGLG:7,LGLGGL:8,LGGLGL:9}};self.onmessage=function(e){Image={data:new Uint8ClampedArray(e.data.ImageData),width:e.data.Width,height:e.data.Height};FormatPriority=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5"];Secure2Of5=true;Ean13Speed=true;LowLight=false;if(typeof e.data.LowLight!="undefined")LowLight=e.data.LowLight;if(typeof e.data.Ean13Speed!="undefined")Ean13Speed=e.data.Ean13Speed;if(typeof e.data.Secure2Of5!="undefined")Secure2Of5=e.data.Secure2Of5;DecodeNr=Number.POSITIVE_INFINITY;if(typeof e.data.DecodeNr!="undefined"){DecodeNr=e.data.DecodeNr}if(typeof e.data.Decode!="undefined"){FormatPriority=e.data.Decode}CreateTable();switch(e.data.cmd){case"flip":flipTable();break;case"right":rotateTableRight();break;case"left":rotateTableLeft();break;case"normal":break}Main();postMessage({result:[],success:false,finished:true})}';

  function CropTable(e, t, n, r) {
    if (n - e < Image.width && n - e > 0)Image.table = Image.table.slice(e, n);
    if (r - t < Image.height && r - t > 0) {for (var i = 0; i < Image.table.length; i++) {Image.table[i] = Image.table[i].slice(t, r)}}
    if (Image.width !== Image.table.length || Image.height !== Image.table[0].length) {
      Image.width = Image.table.length;
      Image.height = Image.table[0].length;
      CreateImageData()
    }
  }

  function Log(e) {
    postMessage({result: e, success: "log"})
  }

  function flipTable() {
    for (var e = 0; e < Image.table.length; e++) {Image.table[e].reverse()}
    Image.table.reverse();
    CreateImageData()
  }

  function rotateTableRight() {
    var e = [];
    var t = [];
    for (var n = Image.table[0].length - 1; n >= 0; n--) {
      t = [];
      for (var r = 0; r < Image.table.length; r++) {t.push(Image.table[r][n])}
      e.push(t)
    }
    Image.table = e;
    Image.width = Image.table.length;
    Image.height = Image.table[0].length;
    CreateImageData()
  }

  function rotateTableLeft() {
    var e = [];
    var t = [];
    for (var n = 0; n < Image.table[0].length; n++) {
      t = [];
      for (var r = Image.table.length - 1; r >= 0; r--) {t.push(Image.table[r][n])}
      e.push(t)
    }
    Image.table = e;
    Image.width = Image.table.length;
    Image.height = Image.table[0].length;
    CreateImageData()
  }

  function RemoveDist() {
    var e = 0;
    var t = 0;
    var n = [];
    var r;
    for (var i = 0; i < Image.height; i++) {
      e = 0;
      t = 0;
      for (var s = 0; s < Image.width; s++) {
        if ((Image.table[s][i][0] + Image.table[s][i][1] + Image.table[s][i][2]) / 3 < 100) {
          do {
            t++;
            s++;
            if (s >= Image.width) {break}
          } while ((Image.table[s][i][0] + Image.table[s][i][1] + Image.table[s][i][2]) / 3 < 100);
          if (s < Image.width) {
            r = (Image.table[s][i][0] + Image.table[s][i][1] + Image.table[s][i][2]) / 3;
            do {
              e++;
              s++;
              if (s >= Image.width) {
                e = 0;
                break
              }
            } while ((Image.table[s][i][0] + Image.table[s][i][1] + Image.table[s][i][2]) / 3 > r)
          }
          if (e > t * 4) {n.push(s)} else {n.push(0)}
          s = Image.width
        }
      }
    }
    t = 0;
    for (var o = 0; o < n.length; o++) {t += n[o]}
    t /= n.length;
    if (t > 20)CropTable(Math.floor(t), 0, Image.width, Image.height)
  }

  function verticalAreas() {
    dataCopy = new Uint8ClampedArray(Image.data);
    if (LowLight) {contrastBinary(dataCopy)} else {
      contrast(dataCopy, 250);
      binary(dataCopy, 100)
    }
    var e = Image.width * 4 * Math.round(Image.height / 2);
    var t = [];
    var n;
    var r;
    for (var i = e; i < e + Image.width * 4; i += 4) {
      if (dataCopy[i] === 0) {
        n = i;
        break
      }
    }
    var s;
    var o = false;
    var u = n;
    for (var i = n; i < e + Image.width * 4; i += 4) {
      if (dataCopy[i] === 255) {
        r++;
        if (o == false) {
          s = i;
          o = true
        }
        if (r > 30) {
          if (u - e > 40) {u -= 40}
          t.push([(u - e) / 4, (s - e) / 4]);
          while (dataCopy[i] === 255 && i < e + Image.width * 4) {i += 4}
          u = i
        }
      } else {
        r = 0;
        o = false
      }
    }
    return t
  }

  function InterestAreas(e, t) {
    dataCopy = new Uint8ClampedArray(Image.data);
    if (LowLight) {contrastBinary(dataCopy)} else {
      contrast(dataCopy, 250);
      binary(dataCopy, 100)
    }
    var n = 10;
    var r = 6;
    var i = 0;
    var s = -1;
    do {
      do {
        i = HorizontalArea(dataCopy, i, r);
        n--
      } while (typeof i == typeof 5 && n);
      if (i[1] - i[0] < 25) {
        if (r > 1) {
          i = i[1];
          r -= .5;
          n = 10
        }
      } else {
        if (r > 1) {
          if (s !== i[0]) {
            s = i[0];
            if (typeof i !== typeof 5)allAreas.push(i);
            i = i[1];
            r -= .5;
            n = 10
          } else {
            i = 0;
            r -= .5;
            n = 10
          }
        } else {break}
      }
    } while (typeof i === typeof 5)
  }

  function CreateImageData() {
    Image.data = new Uint8ClampedArray(Image.width * Image.height * 4);
    var e;
    for (var t = 0; t < Image.height; t++) {
      for (var n = 0; n < Image.width; n++) {
        e = t * 4 * Image.width;
        Image.data[e + n * 4] = Image.table[n][t][0];
        Image.data[e + n * 4 + 1] = Image.table[n][t][1];
        Image.data[e + n * 4 + 2] = Image.table[n][t][2];
        Image.data[e + n * 4 + 3] = Image.table[n][t][3]
      }
    }
  }

  function BlackEdges(e) {
    var t = 0;
    var n = [];
    for (var r = 0; r < Image.height; r++) {n.push([255, 255, 255, 255])}
    for (var i = 0; i < Image.width; i++) {
      t = 0;
      for (var s = 0; s < Image.height; s++) {t += (Image.table[i][s][0] + Image.table[i][s][1] + Image.table[i][s][2]) / 3}
      t /= Image.height;
      if (t < e) {Image.table[i] = n.slice()} else {
        Image.table[i] = n.slice();
        Image.table[i + 1] = n.slice();
        break
      }
    }
    for (var i = Image.width - 1; i >= 0; i--) {
      t = 0;
      for (var s = 0; s < Image.height; s++) {t += (Image.table[i][s][0] + Image.table[i][s][1] + Image.table[i][s][2]) / 3}
      t /= Image.height;
      if (t < e) {Image.table[i] = n.slice()} else {break}
    }
    CreateImageData()
  }

  function CreateTable() {
    Image.table = [];
    var e = [];
    for (var t = 0; t < Image.width * 4; t += 4) {
      e = [];
      for (var n = t; n < Image.data.length; n += Image.width * 4) {e.push([Image.data[n], Image.data[n + 1], Image.data[n + 2], Image.data[n + 3]])}
      Image.table.push(e)
    }
  }

  function EnlargeTable(e, t) {
    var n = [];
    for (var r = 0; r < Image.width; r++) {
      n = [];
      for (var i = 0; i < Image.height; i++) {for (var s = 0; s < e; s++) {n.push(Image.table[r][i])}}
      Image.table[r] = n.slice()
    }
    n = Image.table.slice();
    for (var r = 0; r < Image.width; r++) {for (var s = 0; s < t; s++) {Image.table[r * t + s] = n[r].slice()}}
    Image.width = Image.table.length;
    Image.height = Image.table[0].length;
    CreateImageData()
  }

  function ScaleHeight(e) {
    var t = [];
    var n = 0;
    var r = 0;
    var i = 0;
    for (var s = 0; s < Image.height - e; s += e) {
      for (var o = 0; o < Image.width; o++) {
        n = 0;
        r = 0;
        i = 0;
        for (var u = s; u < s + e; u++) {
          n += Image.table[o][u][0];
          r += Image.table[o][u][1];
          i += Image.table[o][u][2]
        }
        t.push(n / e);
        t.push(r / e);
        t.push(i / e);
        t.push(255)
      }
    }
    return new Uint8ClampedArray(t)
  }

  function ImgProcessing() {
    var e = new Uint8ClampedArray(Image.data);
    if (LowLight) {contrastBinary(e)} else {
      contrast(e, 255);
      binary(e, 110)
    }
    var t = TrimBlack(e);
    CropTable(t[0], 0, t[1], Image.height);
    allAreas = [];
    var n;
    var r = Image.table.slice();
    InterestAreas();
    if (allAreas.length === 0) {allAreas.push(averageLines())}
    if (Image.height - allAreas[allAreas.length - 1][1] > 30) {
      CropTable(0, allAreas[allAreas.length - 1][1], Image.width, Image.height);
      Image.width = Image.table.length;
      Image.height = Image.table[0].length;
      CreateImageData();
      InterestAreas();
      Image.table = r.slice();
      Image.width = Image.table.length;
      Image.height = Image.table[0].length;
      CreateImageData()
    }
    var i = [];
    Image.table = r.slice();
    Image.width = Image.table.length;
    Image.height = Image.table[0].length;
    for (var s = 0; s < allAreas.length; s++) {
      n = allAreas[s];
      if (n[1] > Image.height)n[1] = Image.height;
      CropTable(0, n[0], Image.width, n[1]);
      i.push(Image.table.slice());
      Image.table = r.slice();
      Image.width = Image.table.length;
      Image.height = Image.table[0].length
    }
    var o = i.length;
    for (var s = 0; s < o; s++) {
      Image.table = i[s];
      Image.width = Image.table.length;
      Image.height = Image.table[0].length;
      CreateImageData();
      var u = verticalAreas();
      if (u.length > 1) {
        tempSecondTable = Image.table.slice();
        CropTable(0, 0, u[0][1], Image.height);
        i[s] = Image.table.slice();
        for (var a = 1; a < u.length; a++) {
          Image.table = tempSecondTable.slice();
          Image.width = Image.table.length;
          Image.height = Image.table[0].length;
          CropTable(u[a][0], 0, u[a][1], Image.height);
          i.push(Image.table.slice())
        }
      }
    }
    return i
  }

  function contrast(e, t) {
    t = Math.max(0, Math.min(255, parseFloat(t) || 127));
    var n = [];
    for (var r = 0; r < 256; r++) {
      var i = Math.tan(t * Math.PI / 180) * (r - 127) + 127;
      if (i > 255) {i = 255} else if (i < 0) {i = 0}
      n[r] = i | 0
    }
    for (var r = 0, s = Image.width * Image.height * 4; r < s; r += 4) {
      e[r] = n[e[r]];
      e[r + 1] = n[e[r + 1]];
      e[r + 2] = n[e[r + 2]]
    }
  }

  function binary(e, t) {
    t = Math.max(0, Math.min(255, parseFloat(t) || 127));
    var n;
    for (var r = 0, i = Image.width * Image.height * 4; r < i; r += 4) {
      n = (e[r] + e[r + 1] + e[r + 2]) / 3;
      if (n < t) {e[r] = e[r + 1] = e[r + 2] = 0} else {e[r] = e[r + 1] = e[r + 2] = 255}
      e[r + 3] = 255
    }
  }

  function TrimBlack(e) {
    var t = [];
    var n = 0;
    for (var r = 0; r < e.length; r += 4) {
      for (var i = r; i < e.length; i += Image.width * 4) {n += e[i]}
      if (n / Image.height > 100) {
        t.push(r / 4 % Image.width);
        break
      }
      n = 0
    }
    n = 0;
    for (var r = Image.width * 4 - 4; r > 0; r -= 4) {
      for (var i = r; i < e.length; i += Image.width * 4) {n += e[i]}
      if (n / Image.height > 100) {
        t.push(r / 4 % Image.width);
        break
      }
      n = 0
    }
    return t
  }

  function HorizontalArea(e, t, n) {
    t = typeof t !== "undefined" ? t : 1;
    t = t > 0 ? t : 1;
    var r = 0;
    var i = 0;
    var s = 0;
    for (var o = t * 4 * Image.width; o < e.length / n; o += Image.width * 4) {
      for (var u = 0; u < Image.width * 4; u += 4) {s += e[u + o]}
      if (s / Image.width > 230) {
        i = o;
        break
      }
      s = 0
    }
    var a = 0;
    s = 0;
    if (i) {
      for (var o = i; o < e.length; o += Image.width * 4) {
        for (var u = 0; u < Image.width * 4; u += 4) {if (e[u + o] === 0) {s++}}
        if (s > Image.width / 5) {
          r = o;
          break
        }
        s = 0
      }
    } else {
      for (var o = t * 4 * Image.width; o < e.length; o += Image.width * 4) {
        for (var u = 0; u < Image.width * 4; u += 4) {s += e[u + o]}
        if (s / Image.width > 230) {
          a = o;
          break
        }
        s = 0
      }
    }
    if (i) {return Math.round(r / 4 / Image.width)} else {return[t, Math.round(a / 4 / Image.width)]}
  }

  function averageLines() {
    var e = 0;
    var t = [];
    for (var n = 0; n < Image.data.length; n += Image.width * 4) {
      e = 0;
      for (var r = n; r < Image.width * 4 + n; r += 4) {e += (Image.data[r] + Image.data[r + 1] + Image.data[r + 2]) / 3}
      e /= Image.width;
      t.push(e)
    }
    var i = [];
    e = 0;
    var s = t[0];
    for (var n = 1; n < t.length; n++) {
      if (Math.abs(t[n] - s) > 13) {
        i.push([e, n - 1]);
        e = n;
        s = t[n]
      }
    }
    e = 0;
    var o = [0, Image.height];
    for (var n = 0; n < i.length; n++) {
      if (i[n][1] - i[n][0] > e) {
        e = i[n][1] - i[n][0];
        o = i[n]
      }
    }
    return o
  }

  function Main() {
    var e = ImgProcessing();
    var t = 0;
    for (var n = 0; n < e.length; n++) {
      Image.table = e[n];
      Image.width = Image.table.length;
      Image.height = Image.table[0].length;
      CreateImageData();
      var r = averageLines();
      CropTable(0, r[0], Image.width, r[1]);
      BlackEdges(100);
      RemoveDist();
      var i = ScaleHeight(30);
      var s;
      var o = 0;
      var u = "";
      var a = {};
      var f = [];
      r = false;
      do {
        s = yStraighten(i.subarray(o, o + Image.width * 4));
        for (var l = 0; l < FormatPriority.length; l++) {
          if (u != "EAN-13") {
            if (FormatPriority[l] == "Code128") {
              r = BinaryString(s, 0);
              if (r.string) {
                u = r.format;
                r = r.string
              }
            }
            if (FormatPriority[l] == "Code93") {
              r = BinaryString(s, 1);
              if (r)u = "Code93"
            }
            if (FormatPriority[l] == "Code39") {
              r = BinaryString(s, 2);
              if (r)u = "Code39"
            }
            if (FormatPriority[l] == "2Of5" || FormatPriority[l] == "Inter2Of5") {
              if (FormatPriority[l] == "2Of5") {
                r = BinaryString(s, 4);
                if (r)u = "Standard 2 of 5"
              } else {
                r = BinaryString(s, 5);
                if (r)u = "Interleaved 2 of 5"
              }
            }
          }
          if (FormatPriority[l] == "EAN-13") {
            var c = BinaryString(s, 3);
            r = c.string;
            if (r) {
              u = "EAN-13";
              if (typeof a[r] == "undefined") {
                a[r] = {count: 1, correction: c.correction};
                f.push(r)
              } else {
                a[r].count = a[r].count + 1;
                a[r].correction = a[r].correction + c.correction
              }
              if (!Ean13Speed)r = false
            }
          }
          if (r)break
        }
        o += Image.width * 4
      } while (!r && o < i.length);
      if (r && u != "EAN-13") {
        postMessage({result: [u + ": " + r], success: true, finished: false});
        t++
      }
      if (u == "EAN-13" && !Ean13Speed)r = false;
      if (!r) {
        EnlargeTable(4, 2);
        o = 0;
        i = ScaleHeight(20);
        do {
          s = yStraighten(i.subarray(o, o + Image.width * 4));
          for (var l = 0; l < FormatPriority.length; l++) {
            if (u != "EAN-13") {
              if (FormatPriority[l] == "Code128") {
                r = BinaryString(s, 0);
                if (r.string) {
                  u = r.format;
                  r = r.string
                }
              }
              if (FormatPriority[l] == "Code93") {
                r = BinaryString(s, 1);
                if (r)u = "Code93"
              }
              if (FormatPriority[l] == "Code39") {
                r = BinaryString(s, 2);
                if (r)u = "Code39"
              }
              if (FormatPriority[l] == "2Of5" || FormatPriority[l] == "Inter2Of5") {
                if (FormatPriority[l] == "2Of5") {
                  r = BinaryString(s, 4);
                  if (r)u = "Standard 2 of 5"
                } else {
                  r = BinaryString(s, 5);
                  if (r)u = "Interleaved 2 of 5"
                }
              }
            }
            if (FormatPriority[l] == "EAN-13") {
              var c = BinaryString(s, 3);
              r = c.string;
              if (r) {
                u = "EAN-13";
                if (typeof a[r] == "undefined") {
                  a[r] = {count: 1, correction: c.correction};
                  f.push(r)
                } else {
                  a[r].count = a[r].count + 1;
                  a[r].correction = a[r].correction + c.correction
                }
                if (!Ean13Speed)r = false
              }
            }
            if (r)break
          }
          o += Image.width * 4
        } while (!r && o < i.length);
        if (r && u != "EAN-13") {
          postMessage({result: [u + ": " + r], success: true, finished: false});
          t++
        }
      }
      if (u == "EAN-13") {
        var h = {};
        for (var p in a) {
          a[p].correction = a[p].correction / a[p].count;
          var d = a[p].correction;
          if (Ean13Speed) {d -= a[p].count * 4} else {d -= a[p].count}
          d += f.indexOf(p);
          h[p] = d
        }
        var v = Number.POSITIVE_INFINITY;
        var m = "";
        for (var p in h) {
          if (h[p] < v) {
            v = h[p];
            m = p
          }
        }
        if (v < 11) {r = m} else {r = false}
        if (r) {
          postMessage({result: [u + ": " + r], success: true, finished: false});
          t++
        }
      }
      if (t >= DecodeNr)break
    }
    return[]
  }

  function yStraighten(e) {
    var t = 0;
    var n;
    var r = new Uint8ClampedArray(Image.width * 150 * 4);
    for (var i = 0; i < r.length; i++) {r[i] = 255}
    for (var i = 0; i < Image.width * 4; i += 4) {
      n = 180;
      t = (e[i] + e[i + 1] + e[i + 2]) / 3;
      t += (e[i + 4] + e[i + 5] + e[i + 6]) / 3;
      t /= 2;
      for (var s = i; s < r.length; s += Image.width * 4) {
        if (t < n) {r[s] = r[s + 1] = r[s + 2] = 0}
        n--
      }
    }
    return r
  }

  function TwoOfFiveStartEnd(e, t) {
    if (e.length < 5 || e.length > 6)return false;
    var n = [
      [0, 0],
      [0, 0]
    ];
    for (var r = 0; r < e.length; r++) {
      if (e[r] > n[0][0]) {
        n[0][0] = e[r];
        var i = n[0][1];
        n[0][1] = r;
        r = i
      }
      if (e[r] > n[1][0] && r != n[0][1]) {
        n[1][0] = e[r];
        n[1][1] = r
      }
    }
    var s = n[0][0] + n[1][0];
    s /= 2;
    if (n[0][0] / s > 1.2 || n[0][0] / s < .8)return false;
    if (n[1][0] / s > 1.2 || n[1][0] / s < .8)return false;
    var o = 0;
    for (var u = 0; u < e.length; u++) {
      if (u == n[0][1] || u == n[1][1])continue;
      o += e[u]
    }
    o /= e.length - 2;
    for (var u = 0; u < e.length; u++) {
      if (u == n[0][1] || u == n[1][1])continue;
      if (e[u] / o > 1.4 || e[u] / o < .6)return false
    }
    if (t) {return(n[0][1] == 0 || n[0][1] == 2) && (n[1][1] == 0 || n[1][1] == 2)} else {return(n[0][1] == 0 || n[0][1] == 4) && (n[1][1] == 0 || n[1][1] == 4)}
  }

  function CheckInterleaved(e, t) {
    var n = 0;
    for (var r = 0; r < e.length; r++) {n += e[r]}
    n /= 4;
    if (t) {
      if (e.length != 4)return false;
      for (var r = 0; r < e.length; r++) {if (e[r] / n < .8 || e[r] / n > 1.2)return false}
      return true
    } else {
      if (e.length != 3)return false;
      var i = 0;
      var s;
      for (var r = 0; r < e.length; r++) {
        if (e[r] > i) {
          i = e[r];
          s = r
        }
      }
      if (s != 0)return false;
      if (e[0] / n < 1.5 || e[0] / n > 2.5)return false;
      for (var r = 1; r < e.length; r++) {if (e[r] / n < .5 || e[r] / n > 1.5)return false}
      return true
    }
  }

  function contrastBinary(e) {
    var t = 127 * 3;
    var n = 128 * 3;
    for (var r = 0, i = Image.width * Image.height * 4; r < i; r += 4) {
      var s = e[r] + e[r + 1] + e[r + 2];
      if (s < t) {t = s} else if (s > n) {n = s}
    }
    var o = (n + t) / 2;
    for (var r = 0, i = Image.width * Image.height * 4; r < i; r += 4) {
      ave = e[r] + e[r + 1] + e[r + 2];
      if (ave < o) {e[r] = e[r + 1] = e[r + 2] = 0} else {e[r] = e[r + 1] = e[r + 2] = 255}
      e[r + 3] = 255
    }
  }

  function BinaryString(e, t) {
    var n = [];
    var r = [];
    var i = 0;
    var s;
    var o;
    var u;
    var a = false;
    if (t == 0) {u = 6}
    if (t == 1) {u = 6}
    if (t == 2) {u = 9}
    if (t == 3) {u = 4}
    if (t == 4) {u = 5}
    if (t == 5) {u = 10}
    var f = false;
    var l = 255;
    var c = false;
    var h = 0;
    var p = 0;
    for (var d = 0; d < e.length - Image.width * 4; d += Image.width * 4) {
      var v = e.subarray(d, d + Image.width * 4);
      o = BarLength(v);
      p = 0;
      if (t == 0 || t == 4)o /= 2;
      n = [];
      s = 0;
      r = [];
      binTempInter = [];
      f = false;
      var m = false;
      for (var g = 0; g < v.length; g += 4) {
        i = 0;
        if (!f && v[g] === 0) {
          f = true;
          c = true;
          if (t == 4) {
            l = v[g];
            var y = [0, 0, 0, 0, 0, 0];
            do {
              y[i] = y[i] + 1;
              g += 4;
              if (l != v[g]) {
                i++;
                l = v[g]
              }
            } while (i < 6 && g < v.length);
            if (!TwoOfFiveStartEnd(y, true)) {break}
            i = 0
          }
          if (t == 5) {
            l = v[g];
            var b = [0, 0, 0, 0];
            do {
              b[i] = b[i] + 1;
              g += 4;
              if (l != v[g]) {
                i++;
                l = v[g]
              }
            } while (i < 4 && g < v.length);
            if (!CheckInterleaved(b, true))break;
            i = 0
          }
        }
        if (f) {
          l = v[g];
          do {
            i++;
            g += 4;
            if (t == 5 && i / o > 5) {
              var w = [];
              for (var E = 0; E < r.length; E++) {
                w.push(r[E]);
                if (E >= binTempInter.length)continue;
                w.push(binTempInter[E])
              }
              if (!CheckInterleaved(w, false)) {
                n = [];
                break
              } else {break}
            }
            if (g >= v.length)break
          } while (v[g] === l);
          if (t == 2 && a) {
            a = false;
            continue
          }
          if (t != 4 || t != 5)i /= o;
          if (t == 5) {if (l == 0) {r.push(i)} else {binTempInter.push(i)}} else {r.push(i)}
          s++;
          if (t == 4 && v[g] == 255) {
            var S = 0;
            do {
              S++;
              g += 4;
              if (S / o > 3) {
                if (!TwoOfFiveStartEnd(r, false)) {
                  n = [];
                  break
                } else {break}
              }
            } while (v[g] == 255 && g < v.length)
          }
          if (t == 4 && g >= v.length - 4) {
            do {g -= 4} while (v[g] == 255 && g >= 0);
            l = v[g];
            var y = [0, 0, 0, 0, 0];
            i = 0;
            do {
              y[i] = y[i] + 1;
              g -= 4;
              if (l != v[g]) {
                i++;
                l = v[g]
              }
            } while (i < 5 && g >= 0);
            if (!TwoOfFiveStartEnd(y, false)) {
              n = [];
              break
            } else {break}
            i = 0
          }
          if (s == 3 && t == 3 && c) {
            s = 0;
            r = [];
            c = false
          }
          if (s === u) {
            if (t == 3 && h == 6) {
              h = 0;
              s = 0;
              if (m) {u = 4}
              r = [];
              continue
            }
            if (h == 5 && !m) {
              m = true;
              u = 5
            }
            n.push(r);
            s = 0;
            r = [];
            if (t == 5) {
              n.push(binTempInter);
              binTempInter = []
            }
            if (t == 3)h++;
            if (t == 2)a = true
          }
          g -= 4;
          if (t == 3 && n.length > 12)break
        }
      }
      r = Distribution(n, t);
      if (t == 3) {
        n = r.data;
        p = r.correction
      } else {n = r}
      if (n.length > 4) {
        if (t == 0) {
          if (CheckCode128(n)) {
            n = DecodeCode128(n);
            break
          }
        } else if (t == 1) {
          if (CheckCode93(n)) {
            n = DecodeCode93(n);
            break
          }
        } else if (t == 2) {
          if (CheckCode39(n)) {
            n = DecodeCode39(n);
            break
          }
        } else if (t == 3) {
          var x = DecodeEAN13(n);
          if (x) {
            if (x.length === 13) {
              n = x;
              break
            }
          }
        } else if (t == 4 || t == 5) {
          var x = Decode2Of5(n);
          if (x) {
            n = x;
            break
          }
        }
      }
    }
    if (t == 0) {if (typeof n.string === "string") {return n} else {return false}}
    if (typeof n === "string") {if (t == 3) {return{string: n, correction: p}} else {return n}} else {return false}
  }

  function BarLength(e) {
    var t = 0;
    for (var n = 0; n < e.length; n += 4) {
      if (e[n] === 0) {
        do {
          t++;
          n += 4
        } while (e[n] === 0);
        break
      }
    }
    return t
  }

  function Distribution(e, t) {
    var n = 0;
    var r = [];
    var i;
    var s;
    var o;
    if (t === 0) {
      s = 11;
      i = 6;
      o = 4
    } else if (t === 1) {
      s = 9;
      i = 6;
      o = 4
    } else if (t === 2) {
      s = 12;
      i = 9
    } else if (t === 3) {
      s = 7;
      i = 4;
      o = 4
    }
    for (var u = 0; u < e.length; u++) {
      var a = e[u];
      var f = 0;
      f = 0;
      var l = 0;
      var c = [];
      var h = [];
      var p = [];
      if (t == 4 || t == 5) {
        var d = [
          [0, 0],
          [0, 0]
        ];
        for (var v = 0; v < a.length; v++) {
          if (!isFinite(a[v]))return[];
          if (a[v] > d[0][0]) {
            d[0][0] = a[v];
            var m = d[0][1];
            d[0][1] = v;
            v = m - 1
          }
          if (a[v] > d[1][0] && v != d[0][1]) {
            d[1][0] = a[v];
            d[1][1] = v
          }
        }
        if (Secure2Of5) {
          wideAvrg = d[0][0] + d[1][0];
          wideAvrg /= 2;
          if (d[0][0] / wideAvrg > 1.2 || d[0][0] / wideAvrg < .8)return[];
          if (d[1][0] / wideAvrg > 1.2 || d[1][0] / wideAvrg < .8)return[];
          narrowAvrg = 0;
          for (var v = 0; v < a.length; v++) {
            if (v == d[0][1] || v == d[1][1])continue;
            narrowAvrg += a[v]
          }
          narrowAvrg /= 3;
          for (var v = 0; v < a.length; v++) {
            if (v == d[0][1] || v == d[1][1])continue;
            if (a[v] / narrowAvrg > 1.2 || a[v] / narrowAvrg < .7)return[]
          }
        }
        for (var v = 0; v < a.length; v++) {
          if (v == d[0][1] || v == d[1][1]) {
            c.push(1);
            continue
          }
          c.push(0)
        }
        r.push(c);
        continue
      }
      while (l < i) {
        f += a[l];
        l++
      }
      if (t === 2) {
        var g = [];
        for (var v = 0; v < 3; v++) {
          var d = 0;
          var y;
          for (var b = 0; b < a.length; b++) {
            if (g.indexOf(b) != -1)continue;
            if (a[b] > d) {
              y = b;
              d = a[b]
            }
          }
          p.push(d);
          g.push(y)
        }
        for (var b = 0; b < a.length; b++) {if (g.indexOf(b) === -1) {h.push(a[b])}}
        var w = 0;
        for (var b = 0; b < h.length; b++) {w += h[b]}
        w /= h.length;
        var E = 0;
        for (var b = 0; b < p.length; b++) {E += p[b]}
        E /= p.length;
        o = E / w
      }
      l = 0;
      while (l < i) {
        c.push(a[l] / f * s);
        l++
      }
      l = 0;
      while (l < i) {
        if (t == 2) {c[l] = Math.abs(1 - c[l]) < Math.abs(o - c[l]) ? 1 : 2} else {
          c[l] = c[l] > o ? o : c[l];
          c[l] = c[l] < 1 ? 1 : c[l];
          c[l] = Math.round(c[l])
        }
        l++
      }
      if (t == 3) {
        var S = 0;
        for (var v = 0; v < c.length; v++) {S += c[v]}
        if (S > 7) {
          var d = 0;
          var x = 0;
          for (var v = 0; v < c.length; v++) {
            if (c[v] > d) {
              d = c[v];
              x = v
            }
          }
          c[x] = d - (S - 7)
        }
      }
      if (t == 3) {for (var v = 0; v < c.length; v++) {n += Math.abs(c[v] - a[v] / f * s)}}
      r.push(c)
    }
    if (t == 3) {return{data: r, correction: n}} else {return r}
  }

  function CheckCode128(e) {
    var t = e[e.length - 2].join("");
    t = Code128Encoding.value.indexOf(t);
    var n = t != -1;
    var r = Code128Encoding.value.indexOf(e[0].join(""));
    n = r === -1 ? false : n;
    for (var i = 1; i < e.length - 2; i++) {
      r += Code128Encoding.value.indexOf(e[i].join("")) * i;
      n = Code128Encoding.value.indexOf(e[i].join("")) === -1 ? false : n
    }
    return r % 103 === t && n
  }

  function Decode2Of5(e) {
    var t = "";
    for (var n = 0; n < e.length; n++) {
      if (TwoOfFiveEncoding.indexOf(e[n].join("")) == -1)return false;
      t += TwoOfFiveEncoding.indexOf(e[n].join(""))
    }
    return t
  }

  function DecodeEAN13(e) {
    if (e.length != 12)return false;
    var t = e.slice(0, 6);
    var n = false;
    var r = e.slice(6, e.length);
    for (var i = 0; i < t.length; i++) {
      var e = "";
      for (var s = 0; s < t[i][0]; s++) {e += "0"}
      for (var s = 0; s < t[i][1]; s++) {e += "1"}
      for (var s = 0; s < t[i][2]; s++) {e += "0"}
      for (var s = 0; s < t[i][3]; s++) {e += "1"}
      t[i] = e;
      if (t[i].length != 7) {
        n = true;
        break
      }
    }
    if (n)return false;
    for (var i = 0; i < r.length; i++) {
      var e = "";
      for (var s = 0; s < r[i][0]; s++) {e += "1"}
      for (var s = 0; s < r[i][1]; s++) {e += "0"}
      for (var s = 0; s < r[i][2]; s++) {e += "1"}
      for (var s = 0; s < r[i][3]; s++) {e += "0"}
      r[i] = e;
      if (r[i].length != 7) {
        n = true;
        break
      }
    }
    if (n)return false;
    var o = [];
    for (var i = 0; i < t.length; i++) {
      if (typeof EAN13Encoding["L"][t[i]] != "undefined") {o.push("L")} else if (typeof EAN13Encoding["G"][t[i]] != "undefined") {o.push("G")} else {
        n = true;
        break
      }
    }
    if (n)return false;
    var u = [];
    if (typeof EAN13Encoding.formats[o.join("")] == "undefined")return false;
    u.push(EAN13Encoding.formats[o.join("")]);
    for (var i = 0; i < t.length; i++) {
      if (typeof EAN13Encoding[o[i]][t[i]] == "undefined") {
        n = true;
        break
      }
      u.push(EAN13Encoding[o[i]][t[i]])
    }
    if (n)return false;
    for (var i = 0; i < r.length; i++) {
      if (typeof EAN13Encoding["R"][r[i]] == "undefined") {
        n = true;
        break
      }
      u.push(EAN13Encoding["R"][r[i]])
    }
    if (n)return false;
    var a = 3;
    var f = 0;
    for (var i = u.length - 2; i >= 0; i--) {
      f += u[i] * a;
      if (a == 3) {a = 1} else {a = 3}
    }
    f = (10 - f % 10) % 10;
    if (u[u.length - 1] == f) {return u.join("")} else {return false}
  }

  function CheckCode93(e) {
    var t = e[e.length - 3].join("");
    var n = e[e.length - 2].join("");
    var r = true;
    if (typeof Code93Encoding[t] == "undefined")return false;
    if (typeof Code93Encoding[n] == "undefined")return false;
    var i = Code93Encoding[t].value;
    var s = 1;
    var o = 0;
    for (var u = e.length - 4; u > 0; u--) {
      r = typeof Code93Encoding[e[u].join("")] === "undefined" ? false : r;
      if (!r)break;
      o += Code93Encoding[e[u].join("")].value * s;
      s++;
      if (s > 20)s = 1
    }
    var a = o % 47;
    var f = a === i;
    if (!f)return false;
    if (!r)return false;
    o = a;
    s = 2;
    i = Code93Encoding[n].value;
    for (var u = e.length - 4; u > 0; u--) {
      r = typeof Code93Encoding[e[u].join("")] === "undefined" ? false : r;
      if (!r)break;
      o += Code93Encoding[e[u].join("")].value * s;
      s++;
      if (s > 15)s = 1
    }
    var l = o % 47;
    var c = l === i;
    return c && f
  }

  function CheckCode39(e) {
    var t = true;
    if (typeof Code39Encoding[e[0].join("")] == "undefined")return false;
    if (Code39Encoding[e[0].join("")].character != "*")return false;
    if (typeof Code39Encoding[e[e.length - 1].join("")] == "undefined")return false;
    if (Code39Encoding[e[e.length - 1].join("")].character != "*")return false;
    for (var n = 1; n < e.length - 1; n++) {
      if (typeof Code39Encoding[e[n].join("")] == "undefined") {
        t = false;
        break
      }
    }
    return t
  }

  function DecodeCode39(e) {
    var t = "";
    var n = false;
    var r = "";
    var i = "";
    for (var s = 1; s < e.length - 1; s++) {
      r = Code39Encoding[e[s].join("")].character;
      if (r == "$" || r == "/" || r == "+" || r == "%") {
        n = true;
        i = r;
        continue
      }
      if (n) {
        if (typeof ExtendedEncoding[i + r] == "undefined") {if (ExtendedExceptions.indexOf(r) != -1)t += r} else {t += ExtendedEncoding[i + r]}
        n = false;
        continue
      }
      t += r
    }
    return t
  }

  function DecodeCode93(e) {
    var t = "";
    var n = false;
    var r = "";
    var i = "";
    for (var s = 1; s < e.length - 3; s++) {
      r = Code93Encoding[e[s].join("")].character;
      if (r == "($)" || r == "(/)" || r == "(+)" || r == "(%)") {
        n = true;
        i = r[1];
        continue
      }
      if (n) {
        if (typeof ExtendedEncoding[i + r] == "undefined") {if (ExtendedExceptions.indexOf(r) != -1)t += r} else {t += ExtendedEncoding[i + r]}
        n = false;
        continue
      }
      t += r
    }
    return t
  }

  function DecodeCode128(e) {
    var t = Code128Encoding[e[0].join("")];
    var n;
    var r = "Code128";
    var i = "";
    for (var s = 1; s < e.length - 2; s++) {
      n = Code128Encoding[e[s].join("")][t];
      switch (n) {
        case"FNC1":
          if (s == 1)r = "GS1-128";
        case"FNC2":
        case"FNC3":
        case"FNC4":
          break;
        case"SHIFT_B":
          s++;
          i += Code128Encoding[e[s].join("")]["B"];
          break;
        case"SHIFT_A":
          s++;
          i += Code128Encoding[e[s].join("")]["A"];
          break;
        case"Code_A":
          t = "A";
          break;
        case"Code_B":
          t = "B";
          break;
        case"Code_C":
          t = "C";
          break;
        default:
          i += n
      }
    }
    return{string: i, format: r}
  }

  TwoOfFiveEncoding = ["00110", "10001", "01001", "11000", "00101", "10100", "01100", "00011", "10010", "01010"];
  Code128Encoding = {212222: {A: " ", B: " ", C: "00"}, 222122: {A: "!", B: "!", C: "01"}, 222221: {A: '"', B: '"', C: "02"}, 121223: {A: "#", B: "#", C: "03"}, 121322: {A: "$", B: "$", C: "04"}, 131222: {A: "%", B: "%", C: "05"}, 122213: {A: "&", B: "&", C: "06"}, 122312: {A: "\'", B: "\'", C: "07"}, 132212: {A: "(", B: "(", C: "08"}, 221213: {A: ")", B: ")", C: "09"}, 221312: {A: "*", B: "*", C: "10"}, 231212: {A: "+", B: "+", C: "11"}, 112232: {A: ",", B: ",", C: "12"}, 122132: {A: "-", B: "-", C: "13"}, 122231: {A: ".", B: ".", C: "14"}, 113222: {A: "/", B: "/", C: "15"}, 123122: {A: "0", B: "0", C: "16"}, 123221: {A: "1", B: "1", C: "17"}, 223211: {A: "2", B: "2", C: "18"}, 221132: {A: "3", B: "3", C: "19"}, 221231: {A: "4", B: "4", C: "20"}, 213212: {A: "5", B: "5", C: "21"}, 223112: {A: "6", B: "6", C: "22"}, 312131: {A: "7", B: "7", C: "23"}, 311222: {A: "8", B: "8", C: "24"}, 321122: {A: "9", B: "9", C: "25"}, 321221: {A: ":", B: ":", C: "26"}, 312212: {A: ";", B: ";", C: "27"}, 322112: {A: "<", B: "<", C: "28"}, 322211: {A: "=", B: "=", C: "29"}, 212123: {A: ">", B: ">", C: "30"}, 212321: {A: "?", B: "?", C: "31"}, 232121: {A: "@", B: "@", C: "32"}, 111323: {A: "A", B: "A", C: "33"}, 131123: {A: "B", B: "B", C: "34"}, 131321: {A: "C", B: "C", C: "35"}, 112313: {A: "D", B: "D", C: "36"}, 132113: {A: "E", B: "E", C: "37"}, 132311: {A: "F", B: "F", C: "38"}, 211313: {A: "G", B: "G", C: "39"}, 231113: {A: "H", B: "H", C: "40"}, 231311: {A: "I", B: "I", C: "41"}, 112133: {A: "J", B: "J", C: "42"}, 112331: {A: "K", B: "K", C: "43"}, 132131: {A: "L", B: "L", C: "44"}, 113123: {A: "M", B: "M", C: "45"}, 113321: {A: "N", B: "N", C: "46"}, 133121: {A: "O", B: "O", C: "47"}, 313121: {A: "P", B: "P", C: "48"}, 211331: {A: "Q", B: "Q", C: "49"}, 231131: {A: "R", B: "R", C: "50"}, 213113: {A: "S", B: "S", C: "51"}, 213311: {A: "T", B: "T", C: "52"}, 213131: {A: "U", B: "U", C: "53"}, 311123: {A: "V", B: "V", C: "54"}, 311321: {A: "W", B: "W", C: "55"}, 331121: {A: "X", B: "X", C: "56"}, 312113: {A: "Y", B: "Y", C: "57"}, 312311: {A: "Z", B: "Z", C: "58"}, 332111: {A: "[", B: "[", C: "59"}, 314111: {A: "\\", B: "\\", C: "60"}, 221411: {A: "]", B: "]", C: "61"}, 431111: {A: "^", B: "^", C: "62"}, 111224: {A: "_", B: "_", C: "63"}, 111422: {A: "NUL", B: "`", C: "64"}, 121124: {A: "SOH", B: "a", C: "65"}, 121421: {A: "STX", B: "b", C: "66"}, 141122: {A: "ETX", B: "c", C: "67"}, 141221: {A: "EOT", B: "d", C: "68"}, 112214: {A: "ENQ", B: "e", C: "69"}, 112412: {A: "ACK", B: "f", C: "70"}, 122114: {A: "BEL", B: "g", C: "71"}, 122411: {A: "BS", B: "h", C: "72"}, 142112: {A: "HT", B: "i", C: "73"}, 142211: {A: "LF", B: "j", C: "74"}, 241211: {A: "VT", B: "k", C: "75"}, 221114: {A: "FF", B: "l", C: "76"}, 413111: {A: "CR", B: "m", C: "77"}, 241112: {A: "SO", B: "n", C: "78"}, 134111: {A: "SI", B: "o", C: "79"}, 111242: {A: "DLE", B: "p", C: "80"}, 121142: {A: "DC1", B: "q", C: "81"}, 121241: {A: "DC2", B: "r", C: "82"}, 114212: {A: "DC3", B: "s", C: "83"}, 124112: {A: "DC4", B: "t", C: "84"}, 124211: {A: "NAK", B: "u", C: "85"}, 411212: {A: "SYN", B: "v", C: "86"}, 421112: {A: "ETB", B: "w", C: "87"}, 421211: {A: "CAN", B: "x", C: "88"}, 212141: {A: "EM", B: "y", C: "89"}, 214121: {A: "SUB", B: "z", C: "90"}, 412121: {A: "ESC", B: "{", C: "91"}, 111143: {A: "FS", B: "|", C: "92"}, 111341: {A: "GS", B: "}", C: "93"}, 131141: {A: "RS", B: "~", C: "94"}, 114113: {A: "US", B: "DEL", C: "95"}, 114311: {A: "FNC3", B: "FNC3", C: "96"}, 411113: {A: "FNC2", B: "FNC2", C: "97"}, 411311: {A: "SHIFT_B", B: "SHIFT_A", C: "98"}, 113141: {A: "Code_C", B: "Code_C", C: "99"}, 114131: {A: "Code_B", B: "FNC4", C: "Code_B"}, 311141: {A: "FNC4", B: "Code_A", C: "Code_A"}, 411131: {A: "FNC1", B: "FNC1", C: "FNC1"}, 211412: "A", 211214: "B", 211232: "C", 233111: {A: "STOP", B: "STOP", C: "STOP"}, value: ["212222", "222122", "222221", "121223", "121322", "131222", "122213", "122312", "132212", "221213", "221312", "231212", "112232", "122132", "122231", "113222", "123122", "123221", "223211", "221132", "221231", "213212", "223112", "312131", "311222", "321122", "321221", "312212", "322112", "322211", "212123", "212321", "232121", "111323", "131123", "131321", "112313", "132113", "132311", "211313", "231113", "231311", "112133", "112331", "132131", "113123", "113321", "133121", "313121", "211331", "231131", "213113", "213311", "213131", "311123", "311321", "331121", "312113", "312311", "332111", "314111", "221411", "431111", "111224", "111422", "121124", "121421", "141122", "141221", "112214", "112412", "122114", "122411", "142112", "142211", "241211", "221114", "413111", "241112", "134111", "111242", "121142", "121241", "114212", "124112", "124211", "411212", "421112", "421211", "212141", "214121", "412121", "111143", "111341", "131141", "114113", "114311", "411113", "411311", "113141", "114131", "311141", "411131", "211412", "211214", "211232", "233111"]};
  Code93Encoding = {131112: {value: 0, character: "0"}, 111213: {value: 1, character: "1"}, 111312: {value: 2, character: "2"}, 111411: {value: 3, character: "3"}, 121113: {value: 4, character: "4"}, 121212: {value: 5, character: "5"}, 121311: {value: 6, character: "6"}, 111114: {value: 7, character: "7"}, 131211: {value: 8, character: "8"}, 141111: {value: 9, character: "9"}, 211113: {value: 10, character: "A"}, 211212: {value: 11, character: "B"}, 211311: {value: 12, character: "C"}, 221112: {value: 13, character: "D"}, 221211: {value: 14, character: "E"}, 231111: {value: 15, character: "F"}, 112113: {value: 16, character: "G"}, 112212: {value: 17, character: "H"}, 112311: {value: 18, character: "I"}, 122112: {value: 19, character: "J"}, 132111: {value: 20, character: "K"}, 111123: {value: 21, character: "L"}, 111222: {value: 22, character: "M"}, 111321: {value: 23, character: "N"}, 121122: {value: 24, character: "O"}, 131121: {value: 25, character: "P"}, 212112: {value: 26, character: "Q"}, 212211: {value: 27, character: "R"}, 211122: {value: 28, character: "S"}, 211221: {value: 29, character: "T"}, 221121: {value: 30, character: "U"}, 222111: {value: 31, character: "V"}, 112122: {value: 32, character: "W"}, 112221: {value: 33, character: "X"}, 122121: {value: 34, character: "Y"}, 123111: {value: 35, character: "Z"}, 121131: {value: 36, character: "-"}, 311112: {value: 37, character: "."}, 311211: {value: 38, character: " "}, 321111: {value: 39, character: "$"}, 112131: {value: 40, character: "/"}, 113121: {value: 41, character: "+"}, 211131: {value: 42, character: "%"}, 121221: {value: 43, character: "($)"}, 312111: {value: 44, character: "(%)"}, 311121: {value: 45, character: "(/)"}, 122211: {value: 46, character: "(+)"}, 111141: {value: -1, character: "*"}};
  Code39Encoding = {111221211: {value: 0, character: "0"}, 211211112: {value: 1, character: "1"}, 112211112: {value: 2, character: "2"}, 212211111: {value: 3, character: "3"}, 111221112: {value: 4, character: "4"}, 211221111: {value: 5, character: "5"}, 112221111: {value: 6, character: "6"}, 111211212: {value: 7, character: "7"}, 211211211: {value: 8, character: "8"}, 112211211: {value: 9, character: "9"}, 211112112: {value: 10, character: "A"}, 112112112: {value: 11, character: "B"}, 212112111: {value: 12, character: "C"}, 111122112: {value: 13, character: "D"}, 211122111: {value: 14, character: "E"}, 112122111: {value: 15, character: "F"}, 111112212: {value: 16, character: "G"}, 211112211: {value: 17, character: "H"}, 112112211: {value: 18, character: "I"}, 111122211: {value: 19, character: "J"}, 211111122: {value: 20, character: "K"}, 112111122: {value: 21, character: "L"}, 212111121: {value: 22, character: "M"}, 111121122: {value: 23, character: "N"}, 211121121: {value: 24, character: "O"}, 112121121: {value: 25, character: "P"}, 111111222: {value: 26, character: "Q"}, 211111221: {value: 27, character: "R"}, 112111221: {value: 28, character: "S"}, 111121221: {value: 29, character: "T"}, 221111112: {value: 30, character: "U"}, 122111112: {value: 31, character: "V"}, 222111111: {value: 32, character: "W"}, 121121112: {value: 33, character: "X"}, 221121111: {value: 34, character: "Y"}, 122121111: {value: 35, character: "Z"}, 121111212: {value: 36, character: "-"}, 221111211: {value: 37, character: "."}, 122111211: {value: 38, character: " "}, 121212111: {value: 39, character: "$"}, 121211121: {value: 40, character: "/"}, 121112121: {value: 41, character: "+"}, 111212121: {value: 42, character: "%"}, 121121211: {value: -1, character: "*"}};
  ExtendedEncoding = {"/A": "!", "/B":'"',"/C":"#","/D":"$","/E":"%","/F":"&","/G":"\'","/H":"(","/I":")","/J":"*","/K":"+","/L":",","/O":"/","/Z":":","%F":";","%G":"<","%H":"=","%I":">","%J":"?","%K":"[","%L":"\\","%M":"]","%N":"^","%O":"_","+A":"a","+B":"b","+C":"c","+D":"d","+E":"e","+F":"f","+G":"g","+H":"h","+I":"i","+J":"j","+K":"k","+L":"l","+M":"m","+N":"n","+O":"o","+P":"p","+Q":"q","+R":"r","+S":"s","+T":"t","+U":"u","+V":"v","+W":"w","+X":"x","+Y":"y","+Z":"z","%P":"{","%Q":"|","%R":"|","%S":"~"};ExtendedExceptions=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9","-","."];EAN13Encoding={L:{"0001101":0,"0011001":1,"0010011":2,"0111101":3,"0100011":4,"0110001":5,"0101111":6,"0111011":7,"0110111":8,"0001011":9},G:{"0100111":0,"0110011":1,"0011011":2,"0100001":3,"0011101":4,"0111001":5,"0000101":6,"0010001":7,"0001001":8,"0010111":9},R:{1110010:0,1100110:1,1101100:2,1000010:3,1011100:4,1001110:5,101e4:6,1000100:7,1001e3:8,1110100:9},formats:{LLLLLL:0,LLGLGG:1,LLGGLG:2,LLGGGL:3,LGLLGG:4,LGGLLG:5,LGGGLL:6,LGLGLG:7,LGLGGL:8,LGGLGL:9}};self.onmessage=function(e){Image={data:new Uint8ClampedArray(e.data.ImageData),width:e.data.Width,height:e.data.Height};FormatPriority=["Code128","Code93","Code39","EAN-13","2Of5","Inter2Of5"];Secure2Of5=true;Ean13Speed=true;LowLight=false;if(typeof e.data.LowLight!="undefined")LowLight=e.data.LowLight;if(typeof e.data.Ean13Speed!="undefined")Ean13Speed=e.data.Ean13Speed;if(typeof e.data.Secure2Of5!="undefined")Secure2Of5=e.data.Secure2Of5;DecodeNr=Number.POSITIVE_INFINITY;if(typeof e.data.DecodeNr!="undefined"){DecodeNr=e.data.DecodeNr}if(typeof e.data.Decode!="undefined"){FormatPriority=e.data.Decode}CreateTable();switch(e.data.cmd){case"flip":flipTable();break;case"right":rotateTableRight();break;case"left":rotateTableLeft();break;case"normal":break}Main();postMessage({result:[],success:false,finished:true})};

  /**
   * Decoding a barcode from an image. This depends on the worker javascript.
   *
   * @param params: {
   *    imageData: Base64 Image,
   *    height: height of the image
   *    width: width of the image
   * }
   * @param cb
   * @returns {*}
   */
  module.decodeBarcode = function (params, cb) {
    //http://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
    //Bit of a hack here.
    var decodeResult = null;

    if (typeof(Worker) !== "function") {
      return cb("Workers Not Supported In Your Browser.");
    }

    var blob;
    try {
      blob = new Blob([barcodeDecodeFunctions], {type: 'application/javascript'});
    } catch (e) { // Backwards-compatibility
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
      blob = new BlobBuilder();
      blob.append(barcodeDecodeFunctions);
      blob = blob.getBlob();
    }

    var decodeWorker = new Worker(URL.createObjectURL(blob));

    function decodeComplete(event) {
      console.log("Barcode Decode Event", event);
      //TODO Niall -> Need to manage passing an image and attempting to decode a barcode.

      if (event.data.success === "log") {
        console.log("Barcode Log:", event.data.result);
      } else if (event.data.success === true) {
        console.log("Barcode Success", event.data.result);
        decodeResult = event.data.result;
      }

      if (event.data.finished === true) {
        return cb("Not finished yet.");
      }
    }

    decodeWorker.onmessage = decodeComplete;

    decodeWorker.postMessage({ImageData: params.imageData, Width: params.width, Height: params.height, cmd: "normal"});
  };

  return module;

}(appForm.utils || {});