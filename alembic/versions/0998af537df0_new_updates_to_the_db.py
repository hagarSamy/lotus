"""new updates to the db

Revision ID: 0998af537df0
Revises: 8e2127f98969
Create Date: 2024-06-16 08:27:05.680910

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '0998af537df0'
down_revision: Union[str, None] = '8e2127f98969'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cart_items')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cart_items',
    sa.Column('user_id', mysql.VARCHAR(length=60), nullable=False),
    sa.Column('product_id', mysql.VARCHAR(length=60), nullable=False),
    sa.Column('quantity', mysql.INTEGER(display_width=11), autoincrement=False, nullable=False),
    sa.Column('id', mysql.VARCHAR(length=60), nullable=False),
    sa.Column('created_at', mysql.DATETIME(), nullable=True),
    sa.Column('updated_at', mysql.DATETIME(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='cart_items_ibfk_1'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='cart_items_ibfk_2'),
    sa.PrimaryKeyConstraint('id'),
    mysql_default_charset='latin1',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###
