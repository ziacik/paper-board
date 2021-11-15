import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { Drawer, Paper75HDB } from "ws-paper";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardService } from "./board/board.service";

@Module({
	imports: [ScheduleModule.forRoot()],
	controllers: [AppController],
	providers: [
		AppService,
		BoardService,
		{
			provide: "DRAWER",
			useFactory: () => {
				const device = new Paper75HDB();
				device.initialize();
				// fixme when to finalize?
				return new Drawer(device);
			},
		},
	],
})
export class AppModule {}
