
import { saveAs } from 'file-saver';
import { utils, write, WorkBook } from 'xlsx';
export class Export2Excel {
    public exportJSON2XL(JSONdata:any, FileName:any) {
        console.log('export json called')
        const ws_name = 'SomeSheet';
        const wb: WorkBook = { SheetNames: [], Sheets: {} };
        const ws: any = utils.json_to_sheet(JSONdata, FileName);
        wb.SheetNames.push(ws_name);
        wb.Sheets[ws_name] = ws;
        const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        function s2ab(s:any) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            };
            return buf;
        }
        console.log('save as called')
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), FileName+'.xlsx');
    }
    public exportJSON2XLAdvance(JSONdata:any, FileName:any) {
        console.log('export json called'+JSON.stringify(JSONdata.length))
        const ws_name = 'SomeSheet';
        const wb: WorkBook = { SheetNames: [], Sheets: {} };
        const ws: any = utils.json_to_sheet(JSONdata, FileName);
        wb.SheetNames.push(ws_name);
        console.log("Sheetnames"+wb.SheetNames)
        wb.Sheets[ws_name] = ws;
        const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary'});
        console.log("wbout"+wb)
        function s2ab(s:any) {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            };
            return buf;
        }
        // for(var i =0; i < JSONdata.length; i++ ){
        //     if(JSONdata[i].date == "2019-06-30") {
        //         console.log("Have Insert New Row")
        //         const wb: WorkBook = { SheetNames: [], Sheets: {} };

        //     } else{
        //       // console.log("Have Insert New Row")
        //     }
        //   }
        console.log('save as called')
        saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), FileName+'.xlsx');
    }

}
