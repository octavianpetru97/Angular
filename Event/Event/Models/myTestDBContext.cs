using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Event.Models
{
    public partial class myTestDBContext: DbContext
    {
        public myTestDBContext()
        {
        }

        public myTestDBContext(DbContextOptions<myTestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TblCities> TblCities { get; set; }
        public virtual DbSet<TblEvents> TblEvent { get; set; }
     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TblCities>(entity =>
            {
                entity.HasKey(e => e.CityId)
                    .HasName("PK__tblCitie__F2D21A967F3B9C20");

                entity.ToTable("tblCities");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.CityName)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblEvents>(entity =>
            {
                entity.HasKey(e => e.EventId)
                    .HasName("PK__tblEvents__7AD04FF1F8EC0A37");

                entity.ToTable("tblEvents");

                entity.Property(e => e.EventId).HasColumnName("EventID");

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Photo)
                  .IsRequired()
                  .HasMaxLength(200)
                  .IsUnicode(false);


            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
