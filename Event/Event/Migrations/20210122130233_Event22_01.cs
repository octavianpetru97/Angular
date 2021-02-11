using Microsoft.EntityFrameworkCore.Migrations;

namespace Event.Migrations
{
    public partial class Event22_01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EventId",
                table: "tblEvents",
                newName: "EventID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EventID",
                table: "tblEvents",
                newName: "EventId");
        }
    }
}
