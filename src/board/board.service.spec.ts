import { Test, TestingModule } from "@nestjs/testing";
import { Device, Drawer } from "ws-paper";
import { BoardService } from "./board.service";

describe("BoardService", () => {
	let service: BoardService;
	let drawer: Drawer;

	beforeEach(async () => {
		drawer = new Drawer({} as Device);
		jest.spyOn(drawer, "drawSvg").mockResolvedValue();

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: "DRAWER",
					useValue: drawer,
				},
				BoardService,
			],
		}).compile();

		service = module.get<BoardService>(BoardService);
	});

	it("run draws Hello, world!", async () => {
		await service.run();
		expect(drawer.drawSvg).toHaveBeenCalledWith(
			"<svg viewBox='0 0 880 528'><text font-size='120' x='50%' y='50%' text-anchor='middle'>Hello, world!</text></svg>"
		);
	});
});
