
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
	name: 'safe'
})
export class SafePipe implements PipeTransform {

	constructor(protected sanitizer: DomSanitizer) { }

	public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		const bypassType = {
			'html': this.sanitizer.bypassSecurityTrustHtml(value),
			'style': this.sanitizer.bypassSecurityTrustStyle(value),
			'script': this.sanitizer.bypassSecurityTrustScript(value),
			'url': this.sanitizer.bypassSecurityTrustUrl(value),
			'resourceUrl': this.sanitizer.bypassSecurityTrustResourceUrl(value)
		};
		return bypassType[type] ?? console.error(`Invalid safe type specified: ${type}`);
	}
}
