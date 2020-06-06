import TinyURL from 'tinyurl';

export default function Shorten(url){
    return TinyURL.shorten(url).then((res, err) => {
        if (res.includes(url)){
            return { res, err: "Shortening Failed:" };
        } 
        return { res , err };
    });
}

