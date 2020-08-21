import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../user.service';
import { AuthService } from '../../auth/auth.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: any[] = [];
  isLoading = false;
  totalUsers = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;
  userIsAdmin: string;

  constructor(
    public usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersService.getUsers(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.userIsAdmin = this.authService.getRole();
    this.usersSub = this.usersService
      .getUsersUpdateListener()
      .subscribe((usersData: { users: any[]; userCount: number }) => {
        this.isLoading = false;
        this.users = usersData.users;
        this.totalUsers = usersData.userCount;
        console.log(this.users);
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
        this.userIsAdmin = this.authService.getRole();
      });
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.usersService.getUsers(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  onDelete(userId: string) {
    this.isLoading = true;
    this.usersService.deleteUser(userId).subscribe(
      () => {
        this.usersService.getUsers(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onReativate(userId: string) {
    this.isLoading = true;
    this.usersService.reactivateUser(userId).subscribe(
      () => {
        this.usersService.getUsers(this.postsPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }
}
