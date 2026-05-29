resource "aws_db_instance" "postgres" {
  allocated_storage = 20
  engine = "postgres"
  instance_class = "db.t3.micro"
}
