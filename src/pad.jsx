export default function pad(d){
    return d < 10 ? `0${d.toString()}`:d
}