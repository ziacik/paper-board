import { Inject, Injectable } from "@nestjs/common";
import { Timeout } from "@nestjs/schedule";
import { Drawer } from "ws-paper";

@Injectable()
export class BoardService {
	constructor(@Inject("DRAWER") private readonly drawer: Drawer) {}

	@Timeout(10000)
	async run(): Promise<void> {
		console.log("DRAW!")
		await this.drawer.drawSvg("<svg viewBox='0 0 880 528'><text font-size='120' x='50%' y='50%' text-anchor='middle'>Hello, world!</text></svg>");
	}
}
