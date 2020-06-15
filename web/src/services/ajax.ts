class Ajax{
    //0 Uninitialized, 1 set up but not sent, 2 sent, 3 in flight, 4 complete
    private READY_STATUS_CODE = 4;

    private isCompleted(req: XMLHttpRequest)
    {
        return req.readyState === this.READY_STATUS_CODE;
    }

    public httpGet(url:string, callback: (status:number, response:string) => any): void {
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            let finished = this.isCompleted(req);
            if(finished)
            {
                callback(req.status, req.responseText)
            }
        }

        var proxy = 'https://cors-anywhere.herokuapp.com/';

        req.open("GET", proxy + url, true);
        req.send();
    }
}

export default Ajax;