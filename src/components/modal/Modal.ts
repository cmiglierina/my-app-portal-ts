
export function  openPortalModal(id:string) {
    const modalDiv = document.getElementById(id) as HTMLDivElement;
    modalDiv.style.display = 'flex';

}


export function closePortalModal(id:string) {
    const modalDiv = document.getElementById(id) as HTMLDivElement;
    modalDiv.style.display = 'none';
}