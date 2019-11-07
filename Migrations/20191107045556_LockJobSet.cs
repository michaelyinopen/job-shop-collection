using Microsoft.EntityFrameworkCore.Migrations;

namespace JobShopCollection.Migrations
{
    public partial class LockJobSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsLocked",
                table: "JobSet",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsLocked",
                table: "JobSet");
        }
    }
}
