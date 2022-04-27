<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Singer extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'singer_id'          => [
                'type'           => 'INT',
                'constraint'     => 5,
                'unsigned'       => true,
                'auto_increment' => true,
            ],
            'name'       => [
                'type'       => 'VARCHAR',
                'constraint' => '100',
                'null' => false
            ],
            'age' => [
                'type' => 'INT',
                'null' => false,
            ],
            'musical_genre' => [
                'type' => 'TEXT',
                'constraint' => '100',
            ],
            'nationality'       => [
                'type'       => 'TEXT',
                'constraint' => '100',
            ],
        ]);
        $this->forge->addKey('singer_id', true);
        $this->forge->createTable('Singers');
    }

    public function down()
    {
        
    }
}
