module.exports = {
  type: 'mariadb',
  host: 'localhost',
  port: '3306',
  username: 'root',
  password: '7400',
  database: 'cineapi',
  entities: ['dist/**/*.entity.js'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
